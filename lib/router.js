const path = require('path')
const Router = require('express').Router

function routerFactory (options = { directory: 'routes' }) {
  const router = Router()
  const root = path.join(process.cwd(), options.directory)

  router.route('*')
    .get(createMiddleWare(root, 'get'))
    .post(createMiddleWare(root, 'post'))
    .put(createMiddleWare(root, 'put'))
    .patch(createMiddleWare(root, 'patch'))
    .delete(createMiddleWare(root, 'delete'))
    .options(function (req, res) {
      res.status(200)
      res.json({})
    })

  function createMiddleWare (root, method = 'get') {
    const methodUrl = `/${method}`

    return function middleware (req, res, next) {
      const file = path.join(root, req.path, methodUrl)
      try {
        const data = require(file)
        const output = typeof data === 'function'
          ? data(req, res, next)
          : data

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
