const test = require('tape')
const decache = require('decache')

test('args: should return the following options', t => {
  const args = require('../../../lib/cli/args')

  const expectedOptions = ['directory', 'open', 'port', 'silent', 'verbose']
  const actual = Object.keys(args)

  const testOption = option => t.ok(actual.find(o => o === option))
  expectedOptions.forEach(testOption)

  t.end()
})

test('args: should read `--directory` if no second args is present', t => {
  const argv = process.argv[2]
  process.argv[2] = ''

  decache('../../../lib/cli/args')
  const args = require('../../../lib/cli/args')

  const actual = args.directory
  const expected = './routes'

  t.equal(actual, expected, 'should be `./routes` by default')

  process.argv[2] = argv

  t.end()
})

test('args: should have the following defaults', t => {
  decache('../../../lib/cli/args')
  const args = require('../../../lib/cli/args')

  const expectedDefaults = {
    open: false,
    port: undefined,
    silent: false,
    verbose: false,
  }

  const testKey = key => t.equal(args[key], expectedDefaults[key])
  Object.keys(expectedDefaults).forEach(testKey)

  t.end()
})
