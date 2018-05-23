const { fetch } = require('../fetch')

test('Fetch current kibana state', async () => {
  const consoleLogSpy = jest.fn()
  console.log = consoleLogSpy
  await fetch({
    kibanaIndexName: '.kibana'
  })
  expect(consoleLogSpy.mock.calls[0][0]).toMatchSnapshot()
})

test('Fetch current kibana state with prettyPrint', async () => {
  const consoleLogSpy = jest.fn()
  console.log = consoleLogSpy
  await fetch({
    kibanaIndexName: '.kibana',
    prettyPrint: true
  })
  expect(consoleLogSpy.mock.calls[0][0]).toMatchSnapshot()
})
