const express = require('express')
const router = express.Router()

router.get('/hello', (req, res) => res.json({ message: 'Posts works' }))

module.exports = router
