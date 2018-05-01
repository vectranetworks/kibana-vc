// const esMock = require('./__mocks/es-mock')
const elasticsearch = require('elasticsearch')
const { DIFF_STATE, INITIAL_STATE, MOCK_DASHBOARD } = require('../__mocks__/es-mock-state')
const { addItem, deploy, doUpdates, getEsState, removeItem, updateItem } = require('../deploy')

const mockClient = new elasticsearch.Client()

test('getEsState filters search results', async () => {
  expect(await getEsState(mockClient)).toMatchSnapshot()
  expect(mockClient.search.mock.calls[0][0]).toMatchSnapshot()
})

test('addItem calls esClient with correct params', async () => {
  const createSpy = jest.spyOn(mockClient, 'create')
  await addItem(MOCK_DASHBOARD, mockClient)
  expect(createSpy).toHaveBeenCalled()
  expect(mockClient.create.mock.calls[0][0]).toMatchSnapshot()
})

test('removeItem calls esClient with correct params', async () => {
  const deleteSpy = jest.spyOn(mockClient, 'delete')
  await removeItem(MOCK_DASHBOARD, mockClient)
  expect(deleteSpy).toHaveBeenCalled()
  expect(mockClient.delete.mock.calls[0][0]).toMatchSnapshot()
})

test('updateItem calls esClient with correct params', async () => {
  const updateSpy = jest.spyOn(mockClient, 'update')
  await updateItem(MOCK_DASHBOARD, mockClient)
  expect(updateSpy).toHaveBeenCalled()
  expect(mockClient.update.mock.calls[0][0]).toMatchSnapshot()
})

test('update to elastic search are done correctly', () => {
  doUpdates(DIFF_STATE, INITIAL_STATE, mockClient, false)
  expect(mockClient.create.mock.calls.length).toBe(2)
  expect(mockClient.delete.mock.calls.length).toBe(2)
  expect(mockClient.update.mock.calls.length).toBe(2)
})

test('update to elastic search are not done if dryRun is set to true', () => {
  doUpdates(DIFF_STATE, INITIAL_STATE, mockClient, true)
  expect(mockClient.create.mock.calls.length).toBe(2)
  expect(mockClient.delete.mock.calls.length).toBe(2)
  expect(mockClient.update.mock.calls.length).toBe(2)
})
