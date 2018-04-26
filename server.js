const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const app = express()

const users = require('./src/routes/api/users')
const profile = require('./src/routes/api/profile')
const posts = require('./src/routes/api/posts')
const db = require('./src/config/keys').mongoURI
const port = 3000 || process.env.PORT

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected'))
  .catch(error => console.log(error))

app.use(passport.initialize())

require('./src/config/passport')(passport)
app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
