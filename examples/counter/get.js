let counter = 0

module.exports = function(req, res) {
  res.send({
    counter: ++counter,
  })
}
