const hash = require('object-hash')
const { cloneDeep } = require('lodash')
const { CHECKSUM_KEY } = require('./es')

const getChecksum = (kibanaObject) => {
  const cloned = cloneDeep(kibanaObject)
  delete cloned.updated_at
  if (cloned.config && cloned.config[CHECKSUM_KEY]) {
    delete cloned.config[CHECKSUM_KEY]
  }
  return hash(cloned)
}

module.exports = {
  getChecksum
}
