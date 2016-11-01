module.exports = function (req, res) {
  const name = req.query.name
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Hello exprexo</title>
      </head>
      <body>
        <h1>Here is your freshly served exprexo ${name}!</h1>
      </body>
    </html>
  `

  res.send(html)
}
