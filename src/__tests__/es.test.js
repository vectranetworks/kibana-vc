const elasticsearch = require('elasticsearch')
const { MOCK_DASHBOARD } = require('../__mocks__/es-mock-state')
const { addItem, getEsState, removeItem, updateItem } = require('../es')

const mockClient = new elasticsearch.Client()

test('getEsState filters search results and excludes config type hits', async () => {
  expect(await getEsState(mockClient, {})).toMatchSnapshot()
  expect(mockClient.search.mock.calls[0][0]).toMatchSnapshot()
})

test('addItem calls esClient with correct params', async () => {
  const createSpy = jest.spyOn(mockClient, 'create')
  await addItem(mockClient, MOCK_DASHBOARD)
  expect(createSpy).toHaveBeenCalled()
  expect(mockClient.create.mock.calls[0][0]).toMatchSnapshot()
})

test('removeItem calls esClient with correct params', async () => {
  const deleteSpy = jest.spyOn(mockClient, 'delete')
  await removeItem(mockClient, MOCK_DASHBOARD)
  expect(deleteSpy).toHaveBeenCalled()
  expect(mockClient.delete.mock.calls[0][0]).toMatchSnapshot()
})

test('updateItem calls esClient with correct params', async () => {
  const updateSpy = jest.spyOn(mockClient, 'index')
  await updateItem(mockClient, MOCK_DASHBOARD)
  expect(updateSpy).toHaveBeenCalled()
  expect(mockClient.index.mock.calls[0][0]).toMatchSnapshot()
})
