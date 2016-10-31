const portfinder = require('portfinder')

module.exports = setup

function setup (options) {
  return getPort(options.port)
    .then(updateOptions)

  function updateOptions (port) {
    const {directory, open, silent} = options
    return {
      directory,
      open,
      port,
      silent
    }
  }
}

function getPort (port, callback) {
  return port || parseInt(process.env.PORT, 10) || findPort()
}

function findPort () {
  portfinder.basePort = 9000

  return new Promise(function (resolve, reject) {
    portfinder.getPort(function (err, port) {
      err
        ? reject(err)
        : resolve(port)
    })
  })
}
