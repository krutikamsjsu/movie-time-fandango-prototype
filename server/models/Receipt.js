const mongoose = require('mongoose');
const { Schema } = mongoose;

const receiptSchema = new Schema({
  seatNumber: String,
  price: String,
  movieName: String,
  watchedOn: Date,
  _user: { type: Schema.Types.ObjectId, ref: 'users' }
});
mongoose.model('Receipt', movieSchema);
