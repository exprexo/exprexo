const test = require('tape')
const sinon = require('sinon')

const loggerFactory = require('../../lib/logger')

function createSpies() {
  const spies = {
    log: sinon.spy(console, 'log'),
    info: sinon.spy(console, 'info'),
    warn: sinon.spy(console, 'warn'),
    error: sinon.spy(console, 'error'),
  }
  return spies
}

function restoreSpies(spies) {
  return Object.keys(spies).map(key => spies[key].restore())
}

test('logger: should allow a info mode by default', t => {
  const spies = createSpies()
  const logger = loggerFactory()

  const methods = ['log', 'info', 'warn', 'error']

  methods.forEach(fn =>
    t.equal(typeof logger[fn], 'function', `should have a method ${fn}`)
  )

  spies.log.reset()
  logger.log()
  t.equal(spies.log.callCount, 0, '`console.log` should not be called')

  spies.info.reset()
  logger.info()
  t.equal(spies.info.callCount, 1, '`console.info` should be called')

  spies.warn.reset()
  logger.warn()
  t.equal(spies.warn.callCount, 1, '`console.warn` should be called')

  spies.error.reset()
  logger.error()
  t.equal(spies.error.callCount, 1, '`console.error` should be called')

  restoreSpies(spies)
  t.end()
})

test('logger: should allow a verbose mode', t => {
  const spies = createSpies()
  const logger = loggerFactory({ verbose: true })

  const methods = ['log', 'info', 'warn', 'error']

  methods.forEach(fn => logger[fn]('foo', 'bar'))
  methods.forEach(fn => logger[fn]({ foo: 'bar' }))

  methods.forEach(fn =>
    t.equal(typeof logger[fn], 'function', `should have a method ${fn}`)
  )

  spies.log.reset()
  logger.log()
  t.equal(spies.log.callCount, 1, '`console.log` should be called')

  spies.info.reset()
  logger.info()
  t.equal(spies.info.callCount, 1, '`console.info` should be called')

  spies.warn.reset()
  logger.warn()
  t.equal(spies.warn.callCount, 1, '`console.warn` should be called')

  spies.error.reset()
  logger.error()
  t.equal(spies.error.callCount, 1, '`console.error` should be called')

  restoreSpies(spies)
  t.end()
})

test('logger: should allow a silent mode', t => {
  const spies = createSpies()
  const logger = loggerFactory({ silent: true })

  const methods = ['log', 'info', 'warn', 'error']

  methods.forEach(fn => logger[fn]('foo', 'bar'))

  methods.forEach(fn =>
    t.equal(typeof logger[fn], 'function', `should have a method ${fn}`)
  )

  spies.log.reset()
  logger.log()
  t.equal(spies.log.callCount, 0, '`console.log` should not be called')

  spies.info.reset()
  logger.info()
  t.equal(spies.info.callCount, 0, '`console.info` should not be called')

  spies.warn.reset()
  logger.warn()
  t.equal(spies.warn.callCount, 0, '`console.warn` should not be called')

  spies.error.reset()
  logger.error()
  t.equal(spies.error.callCount, 0, '`console.error` should not be called')

  restoreSpies(spies)
  t.end()
})
