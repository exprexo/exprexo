const quotes = [
  `exprexo your self`,
  `exprexo and javascript make the perfect blend`,
  `let's get some exprexo`,
]

const say = () => quotes[Math.floor(Math.random() * quotes.length)]

module.exports = {
  say,
}
