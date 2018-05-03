const debug = require('debug')('initialize')
const { initializeKibanaConfig } = require('./initializeKibanaConfig')
const { initializeKibanaIndex } = require('./initializeKibanaIndex')
const { initializeKibanaTemplate } = require('./initializeKibanaTemplate')

const initialize = async ({ esClient, kibanaIndexName, state, dryRun }) => {
  debug('Starting Kibana initialization')
  await initializeKibanaTemplate(esClient, { kibanaIndexName, dryRun })
  await initializeKibanaIndex(esClient, { kibanaIndexName, dryRun })
  await initializeKibanaConfig(esClient, { kibanaIndexName, state, dryRun })
}

module.exports = {
  initialize
}