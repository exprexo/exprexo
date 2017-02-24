const router = require('./router')
const express = require('express')
const cors = require('cors')

/**
 * Creates a new server with the given options.
 * @param  {Object}   options  configurable options.
 * @param  {Function} callback function to be called on start.
 * @return {Object}            express app instance.
 */
function createServer (options, callback) {
  const app = express()

  app.use(cors())

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
