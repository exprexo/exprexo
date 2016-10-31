#! /usr/bin/env node

const opener = require('opener')
const updateNotifier = require('update-notifier')

const pkg = require('../package.json')
const exprexo = require('../lib/exprexo')
const quotes = require('../lib/quotes')
const argv = require('../lib/cli/args')
const cli = require('../lib/cli')
const logger = require('../lib/logger')(argv)

logger.info(quotes.say())
updateNotifier({pkg}).notify()

cli(argv)
  .then(serve)
  .catch(err => logger.error(err.message, err.stack))

/**
 * Starts a new exprexo server given some options.
 * @param  {Object} options configurable options
 */
function serve (options) {
  logger.log(options)
  exprexo(options, showInfo(options))
}

/**
 * Gives feedback and instructions about the current process.
 * @param  {Object} options Already setup options to be read.
 */
function showInfo (options) {
  const url = `http://localhost:${options.port}`
  logger.info(`exprexo freshly served on ${url}`)
  logger.info(`for ${options.directory}`)
  logger.info('Hit CTRL-C to stop the server')

  options.open && opener(url)
}

if (process.platform === 'win32') {
  require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  }).on('SIGINT', function () {
    process.emit('SIGINT')
  })
}

process.on('SIGINT', function () {
  logger.info('exprexo stopped.')
  process.exit()
})

process.on('SIGTERM', function () {
  logger.info('exprexo stopped.')
  process.exit()
})

process.once('SIGUSR2', function () {
  logger.info('\nexprexo restarted.')
  process.exit()
})
