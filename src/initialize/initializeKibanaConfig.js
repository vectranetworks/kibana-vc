const debug = require('debug')('initializeKibanaConfig')

const createConfig = async (esClient, {
  kibanaIndexName,
  type = 'doc',
  id,
  data
}) => {
  debug(`Creating config file`)
  return esClient.index({
    index: kibanaIndexName,
    type,
    id,
    body: data
  })
}

const deepMergeConfig = async (esClient, {
  kibanaIndexName,
  targetState
}) => {
  debug('Deep Merging Config files')
  const currentState = await esClient.get({
    index: kibanaIndexName,
    type: targetState._type,
    id: targetState._id
  })
  if (currentState._source.config['tr-version'] !== targetState._source.config['tr-version']) {
    debug('Config files verison mismatch. Updating')
    await esClient.update({
      index: kibanaIndexName,
      type: targetState._type,
      id: targetState._id,
      body: {
        doc: targetState._source
      }
    })
  } else {
    debug('Config files have the same verison')
  }
  return true
}

const doesConfigExist = async (esClient, {
  kibanaIndexName,
  type = 'doc',
  id
}) => {
  debug(`Checking does Kibana Config exists: ${kibanaIndexName}/${type}/${id}`)
  const exist = await esClient.exists({
    index: kibanaIndexName,
    type,
    id
  })
  debug(`Config file exists: ${exist}`)
  return exist
}

const initializeKibanaConfig = async (esClient, { kibanaIndexName, state }) => {
  debug(`Initializing Kibana config`)
  // TODO: support multiple config files
  const configFile = state.find(doc => doc._source.type === 'config')
  if (! await doesConfigExist(esClient, { kibanaIndexName, type: configFile._type, id: configFile._id })) {
    await createConfig(esClient, {
      kibanaIndexName,
      type: configFile._type,
      id: configFile._id,
      data: configFile._source
    })
  } else {
    // deep merge config files
    debug('deep merging config file')
    await deepMergeConfig(esClient, {
      kibanaIndexName,
      targetState: configFile
    })
  }
  return true
}


module.exports = { initializeKibanaConfig }