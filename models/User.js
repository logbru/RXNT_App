const { Schema, model } = require('mongoose')

const User = model('user', new Schema({
  username: String,
  name: String,
  password: String
}, { timestamps: true }))

module.exports = User