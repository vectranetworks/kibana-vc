async function addItem(item, esClient) {
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
    throw e;
  }
}
async function removeItem(item, esClient) {
  const params = {
    index: item._index,
    type: item._type,
    id: item._id,
  }
  try {
    await esClient.delete(params, esClient)
  } catch (e) {
    console.log('DELETE FAILED', e)
    throw e;
  }
}
async function updateItem(esClient, item) {
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
    throw e;
  }
}

async function getEsState(esClient) {
  // by default we'll only get 10 results back, thus adding the 1000 limit
  return await esClient.search({
    index: '.kibana',
    type: 'doc',
    size: 1000
  })
}

module.exports = { addItem, getEsState, removeItem, updateItem }
