const { INITIAL_STATE } = require('./esMockState')

class Client {
  constructor () {
    this.create = jest.fn()
    this.delete = jest.fn()
    this.index = jest.fn()
    this.search = jest.fn().mockReturnValue({ hits: { hits: INITIAL_STATE } })
  }
}

module.exports = {
  Client
}
