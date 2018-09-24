const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Movie = mongoose.model('Movie');

module.exports = app => {
  app.post('/api/NewMovie', async (req, res) => {
    console.log(req.body);
    const { title, imageUrl } = req.body;

    const movie = new Movie({
      title,
      imageUrl,
      _user: req.user.id
    });
    try {
      await movie.save();
      res.send(movie);
    } catch (err) {
      res.send(400, err);
    }
  });
};
