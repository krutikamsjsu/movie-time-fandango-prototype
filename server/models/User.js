const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const _ = require('lodash');
const { Schema } = mongoose; //const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: String,
  email: {
    type: String,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ]
});
//instance methods
userSchema.methods.toJSON = function() {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

userSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';

  var token = jwt
    .sign({ _id: user._id.toHexString(), access }, keys.jwtSecret)
    .toString();
  user.tokens = user.tokens.concat([{ access, token }]);
  return user.save().then(() => {
    return token;
  });
};

userSchema.methods.removeToken = function(token) {
  var user = this;
  console.log(token);
  return user.update(
    {
      $pull: {
        tokens: { token }
      }
    },
    { multi: true }
  );
};

//model method instead of instance method
userSchema.statics.findByToken = function(token) {
  var users = this;
  var decoded;
  console.log(token);
  try {
    decoded = jwt.verify(token, keys.jwtSecret);
    console.log('decoded..', decoded);
  } catch (e) {
    return Promise.reject();
  }
  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};
//collection of users

var User = mongoose.model('User', userSchema);

module.exports = { User };
