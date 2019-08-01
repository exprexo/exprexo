const colors = require('colors/safe')

module.exports = logger

/**
 * Creates a new configured logger.
 * @param  {Object} options
 * @return {Object}         new logger
 */
function logger(options = {}) {
  const fns = {
    log: _colorify(console.log, 'green'),
    info: _colorify(console.info, 'blue'),
    warn: _colorify(console.warn, 'yellow'),
    error: _colorify(console.error, 'red'),
  }

  const setups = {
    info: {
      log: _noop,
      info: fns.info,
      warn: fns.warn,
      error: fns.error,
    },
    silent: {
      log: _noop,
      info: _noop,
      warn: _noop,
      error: _noop,
    },
    verbose: {
      log: fns.log,
      info: fns.info,
      warn: fns.warn,
      error: fns.error,
    },
  }

  const precedence = ['silent', 'verbose']
  const logLevel = precedence.find(p => options[p]) || 'info'

  return setups[logLevel]
}

/**
 * Call a function `fn` with a string of the given `color`
 * @param  {function} fn = console.log Function to be called.
 * @param  {String} color = 'green'     Color for the output.
 * @return {*}       fn execution return.
 */
function _colorify(fn = console.log, color = 'green') {
  return function print(...args) {
    // TODO review this
    const strings = args.map(string =>
      typeof string === 'string' ? string : JSON.stringify(string, null, 2)
    )

    return fn(colors[color](strings))
  }
}

/**
 * No operation
 * @return {undefined} nothing :P
 */
function _noop() {}
