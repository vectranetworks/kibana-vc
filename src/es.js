async function addItem (esClient, item) {
  const params = {
    index: item._index,
    type: item._type,
    id: item._id,
    body: item._source
  }
  try {
    await esClient.create(params)
  } catch (e) {
    console.log('CREATE FAILED', e)
    throw e
  }
}
async function removeItem (esClient, item) {
  const params = {
    index: item._index,
    type: item._type,
    id: item._id
  }
  try {
    await esClient.delete(params, esClient)
  } catch (e) {
    console.log('DELETE FAILED', e)
    throw e
  }
}
async function updateItem (esClient, item) {
  const params = {
    index: item._index,
    type: item._type,
    id: item._id,
    body: item._source
  }
  try {
    await esClient.index(params)
  } catch (e) {
    console.log('UPDATE FAILED', e)
    throw e
  }
}

async function getEsState (esClient, { kibanaIndexName = '.kibana' }) {
  // TODO: recursive fetch
  // by default we'll only get 10 results back, thus adding the 1000 limit
  return esClient.search({
    index: kibanaIndexName,
    type: 'doc',
    size: 1000
  })
}

const CHECKSUM_KEY = 'tr-checksum'

const isVersioned = (item) => item._source && item._source.config && item._source.config[CHECKSUM_KEY]

const isConfig = (item) => item._source.type !== 'config'

module.exports = {
  CHECKSUM_KEY,
  addItem,
  getEsState,
  removeItem,
  updateItem,
  isVersioned,
  isConfig
}
