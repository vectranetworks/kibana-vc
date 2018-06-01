const elasticsearch = require('elasticsearch')
const { getEsState, CHECKSUM_KEY } = require('./es')
const { getChecksum } = require('./checksum')
const debug = require('debug')('fetch')

const outputState = (state, { prettyPrint }) => {
  let output
  if (prettyPrint) {
    output = JSON.stringify(state, null, 2)
  } else {
    output = JSON.stringify(state)
  }
  console.log(output)
}

const fetch = async ({
  kibanaIndexName,
  host,
  port,
  prettyPrint
}) => {
  debug('Fetching Kibana state')
  const elasticUrl = `${host}:${port}`
  const esClient = await new elasticsearch.Client({
    host: elasticUrl,
    apiVersion: '6.2',
    log: 'error'
  })
  const { hits: { hits: esState } } = await getEsState(esClient, { kibanaIndexName })
  // add checksum
  // TODO: add dashboard version in config?
  const resultState = esState
    .map(source => {
      const checksum = getChecksum(source)
      if (!source.config) {
        source.config = {}
      }
      source.config[CHECKSUM_KEY] = checksum
      return source
    })
  outputState(resultState, { prettyPrint })
}

module.exports = {
  fetch,
  outputState
}
