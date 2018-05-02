const debug = require('debug')('initializeKibanaIndex')

const createIndex = async (esClient, indexName) => {
  debug(`Creating Index: ${indexName}`)
  await esClient.indices.create({
    index: indexName
  })
  debug(`Created Index: ${indexName}`)
}

const doesIndexExist = async (esClient, indexName) => {
  debug(`Checking does kibana Index exists: ${indexName}`)
  let exist
  try {
    await esClient.indices.get({ index: indexName })
    exist = true
  } catch (e) {
    if (e.status !== 404) {
      throw e
    }
    exist = false
  }
  debug(`Index ${indexName} exists: ${exist}`)
  return exist
}

const initializeKibanaIndex = async (esClient, kibanaIndexName) => {
  debug(`Initializing Kibana Index: ${kibanaIndexName}`)
  if (! await doesIndexExist(esClient, kibanaIndexName)) {
    await createIndex(esClient, kibanaIndexName)
  }
  return true
}



module.exports = {
  initializeKibanaIndex
}