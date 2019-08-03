const portfinder = require('portfinder')

module.exports = setup

/**
 * Updates `options.port` if no port is present and picks `options` keys.
 * @param  {Object} options set of options to handle
 * @return {Promise}
 */
function setup (options = {}) {
  return getPort(options.port)
    .then(updateOptions)

  function updateOptions (port) {
    const { directory, open, silent, verbose } = options
    return {
      directory,
      open,
      port,
      silent,
      verbose
    }
  }
}

/**
 * Checks if there is a setup port or tries to find one.
 * @param  {Number}   port     Desired port
 * @return {Promise}
 */
function getPort (port) {
  const preferedPort = parseInt(port || process.env.PORT)
  return preferedPort ? Promise.resolve(preferedPort) : findPort()
}

/**
 * Finds a free port
 * @return {Promise}
 */
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
