const router = require('express').Router()

router.use('/api', require('./api.js'))

module.exports = router