const test = require('tape')
const sinon = require('sinon')

const routerFactory = require('../../lib/router')

test('router: a Router instance', t => {
  const router = routerFactory()
  const route = router.stack[0].route
  const stack = route.stack
  const actualMethods = stack.map(handler => handler.method)
  const expectedMethods = ['get', 'post', 'put', 'delete', 'options', 'patch']

  const testMethod = method =>
    t.ok(
      actualMethods.find(m => m === method),
      `should have the method \`${method}\``
    )

  t.equal(route.path, '*', 'should listen all paths')
  t.equal(stack.length, 6, 'should listen all methods')
  expectedMethods.forEach(testMethod)

  t.end()
})

function createResponseSpies() {
  const res = {
    send: sinon.spy(),
    status: sinon.spy(),
    json: sinon.spy(),
  }

  const { send, status, json } = res

  // Create specific arguments spies.
  send.withArgs('foo').withArgs({ foo: 'bar' })
  json.withArgs({})
  status.withArgs(404).withArgs(200)

  return res
}

test('router(middleware): `options` method should return `200`', t => {
  const responseSpies = createResponseSpies()
  const router = routerFactory({ directory: './test/fixtures' })
  const route = router.stack[0].route
  // get only the `options` method
  const stack = route.stack.filter(s => s.method === 'options')

  const testHandler = handler => {
    const req = {
      path: 'nonexistent/path/file',
    }

    responseSpies.status.reset()
    handler.handle(req, responseSpies)

    t.ok(
      responseSpies.status.withArgs(200).calledOnce,
      `${handler.method} should always return 200`
    )
    t.ok(
      responseSpies.json.withArgs({}).calledOnce,
      `${handler.method} should always return an empty object`
    )
  }

  stack.forEach(testHandler)

  t.end()
})

test(
  'router(middleware): all methods but `options` should return `404` when ' +
    'no file is found',
  t => {
    const responseSpies = createResponseSpies()
    const router = routerFactory({ directory: './test/fixtures' })
    const route = router.stack[0].route
    // remove options method
    const stack = route.stack.filter(s => s.method !== 'options')

    const testHandler = handler => {
      const req = {
        path: 'nonexistent/path/file',
      }

      responseSpies.status.reset()
      handler.handle(req, responseSpies)

      t.ok(
        responseSpies.status.withArgs(404).calledOnce,
        `${handler.method} should return 404 for a non existent path`
      )

      t.equal(
        handler.name,
        'middleware',
        'should have handler function called `middleware`'
      )
    }

    stack.forEach(testHandler)

    t.end()
  }
)

function createSendTest(t, path) {
  const responseSpies = createResponseSpies()
  const router = routerFactory({ directory: './test/fixtures' })
  const route = router.stack[0].route
  // remove options method
  const stack = route.stack.filter(s => s.method !== 'options')

  const testHandler = handler => {
    const req = {
      path: path,
    }

    responseSpies.send.reset()
    handler.handle(req, responseSpies)

    t.ok(
      responseSpies.send.withArgs({ foo: 'bar' }).calledOnce,
      `${handler.method} should return 200 for existent paths`
    )
  }

  stack.forEach(testHandler)

  t.end()
}

test(
  'router(middleware): all methods but `options` should return `200` ' +
    'for JSON files',
  t => createSendTest(t, 'json-samples')
)

test(
  'router(middleware): all methods but `options` should return `200` ' +
    'for simple functions',
  t => createSendTest(t, 'functions')
)

test(
  'router(middleware): all methods but `options` should return `200` ' +
    'for middlewares functions',
  t => createSendTest(t, 'middlewares')
)
