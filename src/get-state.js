const debug = require('debug')('get-state')
const { join } = require('path')
const isRelative = require('is-relative');

const isLocalPath = path => !/:\/\//.test(path)
const isS3Path = path => /s3:\/\//.test(path)

async function getState(path) {
  debug(`analyzing path ${path}`)
  if (isLocalPath(path)) {
    debug('local file path')
    let pathToFile
    if (isRelative(path)) {
      debug(`relative path`)
      pathToFile = join(process.cwd(), path)
    } else {
      debug(`absolut path`)
      pathToFile = path
    }
    return require(pathToFile)
  } else {
    if (isS3Path(path)) {
      // TODO: deal with S3
      throw new Error('S3 upload is not currently supported')
    }
  }
}

module.exports = {
  isLocalPath,
  isS3Path,
  getState
}
