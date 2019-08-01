const test = require('tape')
const sinon = require('sinon')

const portfinder = require('portfinder')
const cli = require('../../../lib/cli')

test('cli: should return only the following options', t => {
  t.plan(1)

  const desiredOptions = {
    directory: 'routes',
    open: true,
    port: 9000,
    silent: false,
    verbose: false,
    foo: 'foo', // this one should be removed
    bar: 'bar', // this one should be removed
    biz: 'biz', // this one should be removed
  }
  const expected = {
    directory: 'routes',
    open: true,
    port: 9000,
    silent: false,
    verbose: false,
  }

  cli(desiredOptions).then(actual =>
    t.deepEqual(actual, expected, 'only the desired keys should be present')
  )
})

test('cli: should allow a configurable port option', t => {
  t.plan(1)

  const desiredOptions = {
    port: Math.floor(Math.random() * 1000) + 8000,
  }

  cli(desiredOptions).then(options =>
    t.equal(
      options.port,
      desiredOptions.port,
      'should have the desired `port` if given as an `option`'
    )
  )
})

test('cli: should allow only intergers as port', t => {
  t.plan(1)

  const desiredOptions = {
    port: Math.random() * 1000 + 8000,
  }

  cli(desiredOptions).then(options =>
    t.equal(
      options.port,
      parseInt(desiredOptions.port),
      'should have the desired `port` if given as an `option` with no decimals'
    )
  )
})

test('cli: should allow a configurable port option as an env variable', t => {
  t.plan(1)

  process.env.PORT = '3000'

  cli().then(options => {
    t.equal(
      options.port,
      3000,
      'should have the desired `port` if given as an env variable'
    )
    process.env.PORT = null // restore config
  })
})

test('cli: should search for new port if the given env.PORT is invalid', t => {
  t.plan(3)

  const stub = sinon.stub(portfinder, 'getPort', fn => fn(null, 9000))

  process.env.PORT = 'foo'

  cli().then(options => {
    const actual = typeof options.port
    const expected = 'number'
    t.equal(actual, expected, 'should be a number')
    t.notEqual(options.port, process.env.PORT, 'should have a new `port`')
    t.ok(stub.calledOnce, 'portfinder.getPort should have been called')
    stub.restore()
    process.env.PORT = null // restore config
  })
})

test('cli: should search for new port if the given port is invalid', t => {
  t.plan(3)

  const stub = sinon.stub(portfinder, 'getPort', fn => fn(null, 9000))

  const desiredOptions = {
    port: 'foo',
  }

  cli(desiredOptions).then(options => {
    const actual = typeof options.port
    const expected = 'number'
    t.equal(actual, expected, 'should be a number')
    t.notEqual(options.port, desiredOptions.port, 'should have a new `port`')
    t.ok(stub.calledOnce, 'portfinder.getPort should have been called')
    stub.restore()
  })
})

test('cli: should search for a port if there is no one given', t => {
  t.plan(2)

  const stub = sinon.stub(portfinder, 'getPort', fn => fn(null, 9000))

  cli().then(options => {
    const actual = typeof options.port
    const expected = 'number'
    t.equal(actual, expected, 'should be a number')
    t.ok(stub.calledOnce, 'portfinder.getPort should have been called')
    stub.restore()
  })
})

test(
  'cli: should search for a port if there is no one given and return an ' +
    'error if something goes wrong',
  t => {
    t.plan(2)

    const stub = sinon.stub(portfinder, 'getPort', fn => fn('error'))

    cli().catch(error => {
      const actual = error
      const expected = 'error'
      t.equal(actual, expected, 'should recive the error')
      t.ok(stub.calledOnce, 'portfinder.getPort should have been called')
      stub.restore()
    })
  }
)
