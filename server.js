const express = require('express')
const mongoose = require('mongoose')
const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')
const port = process.env.PORT || 3000
const app = express()
const db = require('./config/keys').mongoURI

mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected'))
  .catch(error => console.log(error))

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
