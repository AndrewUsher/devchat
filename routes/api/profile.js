const express = require('express')
const router = express.Router()

// @route GET api/posts/hello
// @desc Tests profile route
// @access Public
router.get('/hello', (req, res) => res.json({ message: 'Profile works' }))

module.exports = router
