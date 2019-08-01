const path = require('path')
const Router = require('express').Router

/**
 * Creates a new router, gives a set of options.
 * @param  {Object} options configurable options
 * @return {Router}         express rotuer
 */
function routerFactory(options = { directory: 'routes' }) {
  const router = Router()
  const root = path.join(process.cwd(), options.directory)

  router
    .route('*')
    .get(createMiddleWare(root, 'get'))
    .post(createMiddleWare(root, 'post'))
    .put(createMiddleWare(root, 'put'))
    .patch(createMiddleWare(root, 'patch'))
    .delete(createMiddleWare(root, 'delete'))
    .options(function(req, res) {
      res.status(200)
      res.json({})
    })

  /**
   * Creates a middleware function for the given path and method that tries to
   * obtain a node module from disk, execute it and send the result.
   *
   * @param  {String} root   root path for file resolving.
   * @param  {String} method = 'get' extension to search.
   */
  function createMiddleWare(root, method = 'get') {
    const methodUrl = `/${method}`

    return function middleware(req, res, next) {
      const file = path.join(root, req.path, methodUrl)
      try {
        const data = require(file)
        const output = typeof data === 'function' ? data(req, res, next) : data

        // If data function has already called send, nothing shall be sent again.
        res.send(output)
      } catch (error) {
        res.status(404)
        res.send(`${error.message}. Create either ${file}.js or ${file}.json`)
      }
    }
  }

  return router
}

module.exports = routerFactory
