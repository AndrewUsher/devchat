const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')
const port = process.env.PORT || 3000
const app = express()
const db = require('./config/keys').mongoURI

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected'))
  .catch(error => console.log(error))

app.use(passport.initialize())

require('./config/passport')(passport)
app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
