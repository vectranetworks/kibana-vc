const { getState, isLocalPath, isS3Path } = require('../get-state')
const { localPath, httpPath, s3Path } = require('./fixtures/test-paths')

test('isLocalPath correctly identifies paths', () => {
  expect(isLocalPath(localPath)).toBe(true)
  expect(isLocalPath(httpPath)).toBe(false)
  expect(isLocalPath(s3Path)).toBe(false)
})

test('isS3Path correctly identifies paths', () => {
  expect(isS3Path(localPath)).toBe(false)
  expect(isS3Path(httpPath)).toBe(false)
  expect(isS3Path(s3Path)).toBe(true)
})

test('getState should request the correct file', async () => {
  expect(await getState(localPath)).toMatchSnapshot()
})
