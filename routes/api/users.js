const express = require('express')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')

const router = express.Router()
const User = require('../../models/User')
const secret = require('../../config/keys').jwtSecret
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

// @route GET api/users/hello
// @desc Tests users route
// @access Public
router.get('/hello', (req, res) => res.json({ message: 'Users works' }))

// @route GET api/users/register
// @desc Register new user
// @access Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }
  const { name, email, password } = req.body

  // Find user using email
  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.email = 'Email already exists'
        return res.status(400).json(errors)
      } else {
        const avatar = gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        })

        const newUser = new User({
          name,
          email,
          avatar,
          password
        })

        bcrypt.genSalt(10, (error, salt) => {
          if (error) throw error
          let { password } = newUser
          bcrypt.hash(password, salt, (error, hash) => {
            if (error) console.log(error)
            newUser.password = hash
            newUser
              .save()
              .then(user => res.json(user))
              .catch(error => console.log(error))
          })
        })
      }
    })
})

// @route GET api/users/login
// @desc Login user / Return JWT token
// @access Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  const { email, password } = req.body
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ email: 'User not found' })
      }

      bcrypt.compare(password, user.password)
        .then(match => {
          if (match) {
            const payload = {
              id: user.id,
              name: user.name,
              avatar: user.avatar
            }
            jwt.sign(payload, secret, { expiresIn: 7200 }, (error, token) => {
              if (error) throw error
              res.json({
                success: true,
                token: `Bearer ${token}`
              })
            })
          } else {
            return res.status(400).json({ password: 'Password incorrect' })
          }
        })
    })
})

// @route GET api/users/current
// @desc Return current user
// @access Private

router.get('/current', passport.authenticate('jwt', { sesion: false }, (req, res) => {
  res.json({ id: req.user.id, name: req.user.name, email: req.user.email })
}))

module.exports = router
