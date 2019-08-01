const pug = require('pug')
const template = `
doctype html
html(lang="en")
  head
    title=pageTitle
    script(type='text/javascript').
      if (foo) bar(1 + 5)
  body
    h1 Pug - node template engine
    #container.col
      if youAreUsingPug
        p You are amazing #{name}! #{awesomeText}
      else
        p Get on it!
      p.
        Pug is a terse and simple templating language with a
        strong focus on performance and powerful features.`

const awesomeTemplate = pug.compile(template)

module.exports = function (req, res) {
  const name = req.query.name
  const html = awesomeTemplate({
    name,
    awesomeText: 'You are using exprexo and pug together :D!',
    youAreUsingPug: true,
    pageTitle: 'exprexo and pug together'
  })

  res.send(html)
}
