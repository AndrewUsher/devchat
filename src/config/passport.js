const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model('users')
const secret = require('./keys').jwtSecret

let options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
options.secretOrKey = secret

module.exports = passport => {
  passport.use(new JwtStrategy(options, (payload, done) => {
    User.findById(payload.id)
      .then(user => {
        if (user) {
          return done(null, user)
        } else {
          return done(null, false)
        }
      }).catch(error => console.log(error))
  }))
}
