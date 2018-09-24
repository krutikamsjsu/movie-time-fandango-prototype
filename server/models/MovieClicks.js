const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const movieClicksSchema = new Schema({
  movieId: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  clicks: {
    type: Number,
    required: true,
    default: 1
  }
});

let MovieClicks = mongoose.model('movieclicks', movieClicksSchema);

module.exports = MovieClicks;
