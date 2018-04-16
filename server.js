const express = require('express')
const mongoose = require('mongoose')
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

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
