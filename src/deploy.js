const elasticsearch = require('elasticsearch')
const { addItem, getEsState, removeItem, updateItem } = require('./es-interactions')
const CHECKSUM_KEY = 'tr-checksum'

const isVersioned = (item) => item._source && item._source.config && item._source.config[CHECKSUM_KEY]
const isConfig = (item) => item._source.type !== 'config'

async function doUpdates(esClient, newState, currentState, dryRun) {
  let created = removed = updated = 0

  newState.forEach(async newItem => {
    const newChecksum = newItem._source.config[CHECKSUM_KEY]
    const existingItem = currentState.find(oldItem => oldItem._id === newItem._id)
    if (existingItem) {
      const existingChecksum = existingItem._source.config[CHECKSUM_KEY]
      if(newChecksum !== existingChecksum){
        updated++
        if(!dryRun) {
          updateItem(newItem, esClient)
        }
      }
    } else {
      created++
      if(!dryRun) {
        addItem(newItem, esClient)
      }
    }
  })
  currentState.forEach(item => {
    const itemRemoved = newState.find(newItem => newItem._id === item._id)
    if(!itemRemoved) {
      removed++
      if(!dryRun) {
        removeItem(item, esClient)
      }
    }
  })
  return { created, removed, updated }
}

async function deploy(elasticUrl = process.env.ELASTIC_URL, dryRun) {
  const newState = require('./state.json')
    .filter(isConfig);

  const esClient = await new elasticsearch.Client({
    host: elasticUrl,
    apiVersion: '6.2',
    log: 'error'
  })
  const esState = await getEsState(esClient)
  const currentState =  esState.hits.hits.filter(item => isConfig(item) && isVersioned(item))

  const { created, removed, updated } = await doUpdates(newState, currentState, esClient, dryRun)
  console.log(`created ${created}, removed ${removed}, updated ${updated}`)
}

module.exports = {
  deploy,
  doUpdates,
}
