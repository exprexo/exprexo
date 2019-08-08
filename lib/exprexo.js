const express = require('express')
const cors = require('cors')
const { watcher } = require('pit-require-cache')

const router = require('./router')
const logger = require('../lib/logger')()
/**
 * Creates a new server with the given options.
 * @param  {Object}   options  configurable options.
 * @param  {Function} callback function to be called on start.
 * @return {Object}            express app instance.
 */
function createServer (options, callback) {
  const app = express()

  app.use(cors())
  // For parsing `application/json`.
  app.use(express.json())
  // For parsing `application/x-www-form-urlencoded`.
  app.use(express.urlencoded({ extended: true }))

  if (options.watch) {
    watcher({directory: options.directory})
    logger.info(`Exprexo running on watch mode`)
  }

  // TODO morgan as verbose?
  // app.use(logger('dev'))
  // app.use(logger('combined'))

  // TODO create favicon
  app.use('/favicon.ico', function (req, res) {
    res.sendStatus(200)
  })
  app.use('/', router(options))

  app.listen(options.port, callback)

  return app
}

module.exports = createServer
