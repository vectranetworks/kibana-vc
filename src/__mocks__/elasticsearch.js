const { INITIAL_STATE } = require('./es-mock-state')

class Client {
  constructor() {
    this.create = jest.fn(),
    this.delete = jest.fn(),
    this.search = jest.fn().mockReturnValue({hits: {hits: INITIAL_STATE}}),
    this.update = jest.fn()
  }
}

module.exports = {
  Client
}
