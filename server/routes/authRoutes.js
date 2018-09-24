const passport = require('passport');
const mongoose = require('mongoose');

const { authenticate } = require('../middleware/authenticate');
var { User } = require('../models/User');
module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    async (req, res) => {
      res.redirect('/dashboard').then(() => {
        res.send(req.user);
      });
    }
  );
  app.get('/api/logout', authenticate, (req, res) => {
    console.log(req.user.tokens[0].token);
    req.user.removeToken(req.user.tokens[0].token);
    req.logout();
    //res.send(req.user);

    res.redirect('/');
  });
  app.get('/api/current_user', (req, res) => {
    //res.send(req.session);
    res.send(req.user);
  });

  app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
  });
};
