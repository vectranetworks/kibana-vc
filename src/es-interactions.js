async function addItem(item, esClient) {
  const params = {
    index: item._index,
    type: item._type,
    id: item._id,
    body: item._source
  }
  try {
    await esClient.create(params)
  } catch(e) {
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
  } catch(e) {
    console.log('DELETE FAILED', e)
    throw e;
  }
}
async function updateItem(item, esClient) {
  const params = {
    index: item._index,
    type: item._type,
    id: item._id,
    body: {doc: item._source}
  }
  try {
    await esClient.update(params)
  } catch(e) {
    console.log('UPDATE FAILED', e)
    throw e;
  }
}

async function getEsState(esClient) {
  return await esClient.search({
    index: '.kibana',
    type: 'doc',
    size: 1000
  })
}

module.exports = { addItem, getEsState, removeItem, updateItem }
