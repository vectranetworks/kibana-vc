const elasticsearch = require('elasticsearch')
const CHECKSUM_KEY = 'tr-checksum'

function isVersioned (item) {
  return item._source && item._source.config && item._source.config[CHECKSUM_KEY]
}

async function addItem(dashboard, esClient) {
  const params = {
    index: dashboard._index,
    type: dashboard._type,
    id: dashboard._id,
    body: dashboard._source
  }
  try {
    return await esClient.create(params)
  } catch(e) {
    console.log('CREATE FAILED', e)
  }
}
async function removeItem(dashboard, esClient) {
  const params = {
    index: dashboard._index,
    type: dashboard._type,
    id: dashboard._id,
  }
  try {
    return await esClient.delete(params, esClient)
  } catch(e) {
    console.log('DELETE FAILED', e)
  }
}
async function updateItem(dashboard, esClient) {
  const params = {
    index: dashboard._index,
    type: dashboard._type,
    id: dashboard._id,
    body: {doc: dashboard._source}
  }
  try {
    return await esClient.update(params)
  } catch(e) {
    console.log('UPDATE FAILED', e)
  }
}

async function getEsState(esClient) {
  const esState = await esClient.search({
    index: '.kibana',
    type: 'doc',
    size: 1000
  })

  return esState.hits.hits.filter(item => {
    return item._source.type !== 'config' && isVersioned(item)
  })
}

async function doUpdates(newState, currentState, esClient, dryRun) {
  let created = removed = updated = 0

  newState.forEach(async newItem => {
    const newChecksum = newItem._source.config[CHECKSUM_KEY]
    const existingItem = currentState.find(oldItem => oldItem._id === newItem._id)
    if (existingItem) {
      const existingChecksum = existingItem._source.config[CHECKSUM_KEY]
      if(newChecksum !== existingChecksum){
        updated++
        if(!dryRun) updateItem(newItem, esClient)
      }
    } else {
      created++
      if(!dryRun) addItem(newItem, esClient)
    }
  })
  currentState.forEach(item => {
    const itemRemoved = newState.find(newItem => newItem._id === item._id)
    if(!itemRemoved) {
      removed++
      if(!dryRun) removeItem(item, esClient)
    }
  })
  return {created, removed, updated}
}

async function deploy(elasticUrl = process.env.ELASTIC_URL, dryRun) {
  const newState = require('./state.json')
    .filter(item => item._source.type !== 'config');

  const esClient = await new elasticsearch.Client({
    host: elasticUrl,
    apiVersion: '6.2',
    log: 'error'
  })
  const currentState = await getEsState(esClient)

  const { created, removed, updated } = await doUpdates(newState, currentState, esClient, dryRun)
  console.log(`created ${created}, removed ${removed}, updated ${updated}`)
}

module.exports = {
  addItem,
  deploy,
  doUpdates,
  getEsState,
  removeItem,
  updateItem
}
