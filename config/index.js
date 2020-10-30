module.exports = require('mongoose').connect('mongodb://localhost/rxnt', {
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true
})