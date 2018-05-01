const { localPath, httpPath, s3Path } = require('../__tests__/fixtures/test-paths')

module.exports = (path) => new Promise(resolve => resolve({body:path}))
