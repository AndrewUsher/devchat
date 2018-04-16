const express = require('express')
const router = express.Router()

// @route GET api/users/hello
// @desc Tests users route
// @access Public
router.get('/hello', (req, res) => res.json({ message: 'Users works' }))

module.exports = router
