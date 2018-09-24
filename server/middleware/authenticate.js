const mongoose = require('mongoose');

var { User } = require('../models/User');

var authenticate = (req, res, next) => {
  var token = req.user.tokens[0].token;
  User.findByToken(token)
    .then(user => {
      if (!user) {
        return Promise.reject();
      }
      req.user = user;
      req.token = token;
      next();
    })
    .catch(e => {
      res.status(401).send({ message: 'Some error' });
    });
};
module.exports = { authenticate };
