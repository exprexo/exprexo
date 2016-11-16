const test = require('tape')
const quotes = require('../../lib/quotes')

test('quotes: should be able to return a random quote', (t) => {
  const actual = typeof quotes.say()
  const expected = 'string'
  t.equal(actual, expected)
  t.end()
})
