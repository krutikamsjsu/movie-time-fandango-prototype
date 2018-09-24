const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

var token = jwt.sign(data, keys.jwtSecret);
//jwt comrises of header, payload and the secret. Payload never changes
var decoded = jwt.verify(token, keys.jwtSecret);
