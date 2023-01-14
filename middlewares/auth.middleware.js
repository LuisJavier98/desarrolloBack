const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const passport = require('passport')
const UsersService = require('../services/users.services')
require('dotenv').config()


const UserServices = new UsersService()
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: process.env.JWT_SECRET
}
passport.use(
  new JwtStrategy(options, (tokenDecoded, done) => {
    UserServices.getUser(tokenDecoded.id)
      .then((user) => {
        if (user) {
          done(null, tokenDecoded)
        } else {
          done(null, false)
        }
      })
      .catch((err) => {
        done(err, false)
      })
  })
)
module.exports = passport
