const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

//const User = mongoose.model('User');
var { User } = require('../models/User');
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({
        googleId: profile.id
      });

      if (existingUser) {
        var token = await existingUser.generateAuthToken();
        return done(null, existingUser, token);
      } else {
        const user = await new User({
          googleId: profile.id,
          email: profile.emails[0].value
        }).save();

        var token = await user.generateAuthToken();

        done(null, user, token);
      }
    }
  )
);
