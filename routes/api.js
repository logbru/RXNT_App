const router = require('express').Router()
const md5 = require('md5')
const session = require('cookie-session')
const User = require('../models/User.js')

router.use(session({
  name: 'session',
  secret: 'azYsJLw3YL8vqJZ'
}))

const passwordCheck = (stored, entered) => {
  if (stored === md5(entered)) {
    return true
  } else {
    return false
  }
}

router.post('/register', (req, res) => {
  let md5Pass =
    User.create({
      username: req.body.username,
      name: req.body.name,
      password: md5(req.body.password)
    })
      .then(newUser => {
        req.session.loggedIn = true
        req.session.user = {
          id: newUser._id,
          username: newUser.username,
          name: newUser.name,
          created: newUser.createdAt
        }
        res.json({
          success: true,
          username: newUser.username,
          name: newUser.name,
          created: newUser.createdAt
        })
      })
      .catch(e => console.error(e))
})

router.post('/login', (req, res) => {
  User.findOne({ username: req.body.username })
    .then(result => {
      if (result !== null) {
        switch (passwordCheck(result.password, req.body.password)) {
          case true:
            req.session.loggedIn = true
            req.session.user = {
              id: result._id,
              username: result.username,
              name: result.name,
              created: result.createdAt
            }
            res.json({
              success: true,
              username: result.username,
              name: result.name,
              created: result.createdAt
            })
            break
          case false:
            res.json({
              success: false,
              msg: "Incorrect password."
            })
            break
        }
      } else {
        res.json({
          success: false,
          msg: "No user found with that username."
        })
      }
    })
    .catch(e => console.error(e))
})

router.get('/logout', (req, res) => {
  req.session = null
  res.json({
    success: true
  })
})

router.get('/status', (req, res) => {
  if (req.session.loggedIn === true) {
    res.json({
      success: true,
      username: req.session.user.username,
      name: req.session.user.name,
      created: req.session.user.createdAt
    })
  } else {
    res.json({
      success: false
    })
  }
})
router.get('/session', (req, res) => {
  res.json(req.session)
})

module.exports = router