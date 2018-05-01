// const esMock = require('./__mocks/es-mock')
const elasticsearch = require('elasticsearch')
const { DIFF_STATE, INITIAL_STATE, MOCK_DASHBOARD } = require('../__mocks__/es-mock-state')
const { doUpdates } = require('../deploy')

const mockClient = new elasticsearch.Client()

test('update to es are done correctly', () => {
  doUpdates(DIFF_STATE, INITIAL_STATE, mockClient, false)
  expect(mockClient.create.mock.calls.length).toBe(1)
  expect(mockClient.delete.mock.calls.length).toBe(1)
  expect(mockClient.update.mock.calls.length).toBe(1)
})

test('update to elastic search are not done if dryRun is set to true', () => {
  doUpdates(DIFF_STATE, INITIAL_STATE, mockClient, true)
  expect(mockClient.create.mock.calls.length).toBe(1)
  expect(mockClient.delete.mock.calls.length).toBe(1)
  expect(mockClient.update.mock.calls.length).toBe(1)
})
