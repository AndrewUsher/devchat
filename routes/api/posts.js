const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Model
const Post = require('../../models/Post')

// Validation for post
const validatePostInput = require('../../validation/post')

// @route GET api/posts/hello
// @desc Tests post route
// @access Public
router.get('/hello', (req, res) => res.json({ message: 'Posts works' }))

// @route GET api/posts
// @desc Create post
// @access Private

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  const { name, text, id } = req.user
  const newPost = new Post({
    text,
    name,
    id,
    avatar: name
  })

  newPost
    .save()
    .then(post => res.json(post))
})

module.exports = router
