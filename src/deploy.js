const elasticsearch = require('elasticsearch')
const checksum = require('checksum')
const CHECKSUM_KEY = 'tr-checksum'

function isVersioned (item) {
  return item._source && item._source.config && item._source.config[CHECKSUM_KEY]
}

async function addItem(dashboard) {
  const params = {
    index: dashboard._index,
    type: dashboard._type,
    id: dashboard._id,
    body: dashboard._source
  }
  try {
    await esClient.create(params)
  } catch(e) {
    console.log('CREATE FAILED', e)
  }
}
async function deleteItem(dashboard) {
  const params = {
    index: dashboard._index,
    type: dashboard._type,
    id: dashboard._id,
  }
  try {
    await esClient.delete(params)
  } catch(e) {
    console.log('DELETE FAILED', e)
  }
}
async function updateItem(dashboard) {
  const params = {
    index: dashboard._index,
    type: dashboard._type,
    id: dashboard._id,
    body: {doc: dashboard._source}
  }
  try {
    await esClient.update(params)
  } catch(e) {
    console.log('UPDATE FAILED', e)
  }
}

async function deploy(elasticUrl = process.env.ELASTIC_URL, dryRun) {
  const newState = require('./state.json')
    .filter(item => item._source.type !== 'config');

  const esClient = await new elasticsearch.Client({
    host: elasticUrl,
    apiVersion: '6.2',
    log: 'error'
  })

  const esState = await esClient.search({
    index: '.kibana',
    type: 'doc',
    size: 1000
  })

  const currentState = esState.hits.hits.filter(item => {
    return item._source.type !== 'config' && isVersioned(item)
  })

  let created = 0
  let deleted = 0
  let updated = 0

  if(currentState.length !== 0) {
    newState.forEach(newItem => {
      const newChecksum = newItem._source.config[CHECKSUM_KEY]
      const existingItem = currentState.find(oldItem => oldItem._id === newItem._id)
      if (existingItem) {
        if(newChecksum !== existingItem._source.config[CHECKSUM_KEY]){
          updated++
          !dryRun && updateItem(newItem)
        }
      } else {
        created++
        !dryRun && addItem(newItem)
      }
    })
    currentState.forEach(item => {
      const removed = newState.find(newItem => newItem._id === item._id)
      if(!removed) {
        deleted++
        !dryRun && removeItem(item)
      }
    })
  }
  console.log(`created ${created}, deleted ${deleted}, updated ${updated}`)
}

module.exports = deploy
