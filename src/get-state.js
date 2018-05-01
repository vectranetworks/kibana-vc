const got = require('got')

const isLocalPath = path => !/:\/\//.test(path)
const isS3Path = path => /s3:\/\//.test(path)

async function getState(path, s3Params) {
  if(isLocalPath(path)) {
    const file = require(path)
    return file
  } else {
    if(isS3Path(path)) {
      // TODO: deal with S3
    } else {
      const response = await got(path)
      return response.body
    }
  }
}

module.exports = {
  isLocalPath,
  isS3Path,
  getState
}
