const express = require('express')
const router = express.Router()

// @route GET api/posts/hello
// @desc Tests post route
// @access Public
router.get('/hello', (req, res) => res.json({ message: 'Posts works' }))

module.exports = router
