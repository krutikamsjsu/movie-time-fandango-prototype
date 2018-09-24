const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');
module.exports = app => {
  app.get('/api/movies', async (req, res) => {
    const movies = await Movie.find({});
    res.send(movies);
  });
};
