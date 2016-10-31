const router = require('./router')
const express = require('express')
const corser = require('corser')

function createServer (options, callback) {
  const app = express()

  // TODO should this be an option?
  // Allow cross domain requests
  app.use(corser.create())

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
