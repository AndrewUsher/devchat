const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Models
const Post = require('../../models/Post')
const Profile = require('../../models/Profile')

// Validation for post
const validatePostInput = require('../../validation/post')

// @route GET api/posts/hello
// @desc Tests post route
// @access Public
router.get('/hello', (req, res) => res.json({ message: 'Posts works' }))

// @route GET api/posts/:id
// @desc Get all posts
// @access Public
router.get('/', (req, res) => {
  Post
    .find()
    .sort({ date: -1 })
    .catch(() => res.status(404).json({ nopostsfound: 'No posts found' }))
})

// @route GET api/posts
// @desc Get single post
// @access Public
router.get('/:id', (req, res) => {
  const { id } = req.params
  Post
    .findById(id)
    .then(post => res.json(post))
    .catch(() => res.status(404).json({
      nopostfound: 'The post you\'re looking for doesn\'t exist'
    }))
})

// @route GET api/posts
// @desc Add post
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

// @route POST api/posts/like/:id
// @desc Like post
// @access Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { id: postId } = req.params
  const { id: userId } = req.user
  Profile.findOne({ user: userId })
    .then(profile => {
      Post.findById(postId)
        .then(post => {
          if (post.likes.filter(like => like.user.toString() === userId).length > 0) {
            return res.status(400).json({ notliked: 'You already liked this post' })
          } else {
            post.likes.unshift({ user: userId })

            post
              .save()
              .then(post => res.json(post))
          }
        })
        .catch(() => res.status(404).json({ postnotfound: 'No post found' }))
    })
})

// @route POST api/posts/unlike/:id
// @desc Unlike post
// @access Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { id: postId } = req.params
  const { id: userId } = req.user
  Profile.findOne({ user: userId })
    .then(profile => {
      Post.findById(postId)
        .then(post => {
          if (post.likes.filter(like => like.user.toString() === userId).length === 0) {
            return res.status(400).json({ notliked: 'You have not yet liked this post' })
          } else {
            const removedLike = post.likes
              .map(like => like.user.toString())
              .indexOf(userId)

            post.likes.splice(removedLike, 1)

            post
              .save()
              .then(post => res.json(post))
          }
        })
        .catch(() => res.status(404).json({ postnotfound: 'No post found' }))
    })
})
// @route POST api/posts/comment/:id
// @desc Add comment
// @access Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body)
  const { id } = req.params
  const { text, name, avatar } = req.body
  const { id: userId } = req.user

  if (!isValid) {
    return res.status(400).json(errors)
  } else {
    Post.findById(id)
      .then(post => {
        const newComment = {
          text,
          name,
          avatar,
          id: userId
        }

        post.comments.unshift(newComment)

        post
          .save()
          .then(post => res.json(post))
      })
      .catch(() => res.status(404).json({ postnotfound: 'No post found' }))
  }
})

// @route DELETE api/posts/:id
// @desc Delete post
// @access Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { id: userId } = req.user
  const { id: postId } = req.params
  Profile.findOne({ user: userId })
    .then(profile => {
      Post.findById(postId)
        .then(post => {
          if (post.user.toString() !== userId) {
            return res.status(401).json({ noauthorized: 'User not authorized' })
          } else {
            post
              .remove()
              .then(() => res.json({ success: true }))
              .catch(() => res.status(404).json({ postnotfound: 'Post not found' }))
          }
        })
    })
})

// @route DELETE api/posts/comment/:postId/:commentId
// @desc Delete comment
// @access Private
router.delete('/comment/:postId/:commentId/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { postId, commentId } = req.params

  Post.findById(postId)
    .then(post => {
      if (post.comments.filter(comment => comment._id.toString() === commentId).length === 0) {
        return res.status(404).json({
          commentnotexists: 'Comment doesn\'t exist'
        })
      } else {
        const removedComment = post.comments
          .map(comment => comment._id.toString())
          .indexOf(commentId)

        post.comments.splice(removedComment, 1)

        post
          .save()
          .then(post => res.json(post))
      }
    })
    .catch(() => res.status(404).json({ postnotfound: 'No post found' }))
})

module.exports = router
