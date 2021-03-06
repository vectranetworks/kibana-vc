const elasticsearch = require('elasticsearch')
const { DIFF_STATE, INITIAL_STATE } = require('../__mocks__/esMockState')
const { doUpdates } = require('../deploy')

test('update to es are done correctly', async () => {
  const mockClient = new elasticsearch.Client()
  await doUpdates(mockClient, DIFF_STATE, INITIAL_STATE, false)
  expect(mockClient.create).toHaveBeenCalledTimes(1)
  expect(mockClient.delete).toHaveBeenCalledTimes(1)
  expect(mockClient.index).toHaveBeenCalledTimes(1)
})

test('update to elastic search are not done if dryRun is set to true', async () => {
  const mockClient = new elasticsearch.Client()
  await doUpdates(mockClient, DIFF_STATE, INITIAL_STATE, true)
  expect(mockClient.create).toHaveBeenCalledTimes(0)
  expect(mockClient.delete).toHaveBeenCalledTimes(0)
  expect(mockClient.index).toHaveBeenCalledTimes(0)
})
