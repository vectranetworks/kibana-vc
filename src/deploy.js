const elasticsearch = require('elasticsearch')
const { addItem, getEsState, removeItem, updateItem } = require('./es')
const { getState } = require('./get-state')
const { initialize } = require('./initialize')
const debug = require('debug')('deploy')
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
      if (newChecksum !== existingChecksum) {
        updated++
        if (!dryRun) {
          await updateItem(newItem, esClient)
        }
      }
    } else {
      created++
      if (!dryRun) {
        await addItem(newItem, esClient)
      }
    }
  })
  currentState.forEach(async item => {
    const itemRemoved = newState.find(newItem => newItem._id === item._id)
    if (!itemRemoved) {
      removed++
      if (!dryRun) {
        await removeItem(item, esClient)
      }
    }
  })
  return { created, removed, updated }
}

async function deploy({
  stateFilePath,
  kibanaIndexName,
  host,
  port,
  dryRun
}) {
  debug('Deploying Kibana Dashboard')
  debug(`Getting state file ${stateFilePath}`)
  const stateFile = await getState(stateFilePath)
  const newState = stateFile.filter(isConfig)
  const elasticUrl = `${host}:${port}`

  const esClient = await new elasticsearch.Client({
    host: elasticUrl,
    apiVersion: '6.2',
    log: 'error'
  })
  const esState = await getEsState(esClient)
  const currentState = esState.hits.hits.filter(item => isConfig(item) && isVersioned(item))
  const { created, removed, updated } = await doUpdates(esClient, newState, currentState, dryRun)
  console.log(`created ${created}, removed ${removed}, updated ${updated}`)
}

module.exports = {
  deploy,
  doUpdates,
}
