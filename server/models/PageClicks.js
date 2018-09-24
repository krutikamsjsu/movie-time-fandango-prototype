var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let pageClickSchema = new Schema({
    Login: {
      type: Number,
      default: 0
    },
    Signup: {
      type: Number,
      default: 0
    },
    Home: {
      type: Number,
      default: 0
    },
    Landing: {
      type: Number,
      default: 0
    },
    Dashboard: {
      type: Number,
      default: 0
    },
    MovieDetails: {
      type: Number,
      default: 0
    },
    Bills: {
      type: Number,
      default: 0
    },
    BillDetails: {
      type: Number,
      default: 0
    }
});

let PageClicks = mongoose.model('pageclicks', pageClickSchema);

module.exports = PageClicks;
