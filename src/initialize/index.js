const debug = require('debug')('initialize')
const { initializeKibanaConfig } = require('./initializeKibanaConfig')
const { initializeKibanaIndex } = require('./initializeKibanaIndex')
const { initializeKibanaTemplate } = require('./initializeKibanaTemplate')

const initialize = async ({ esClient, kibanaIndexName, state }) => {
  debug('Starting Kibana initialization')
  await initializeKibanaTemplate(esClient, kibanaIndexName)
  await initializeKibanaIndex(esClient, kibanaIndexName)
  await initializeKibanaConfig(esClient, { kibanaIndexName, state })
}

module.exports = {
  initialize
}