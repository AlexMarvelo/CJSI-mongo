var mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
  Title: String,
  Year: Number,
  imdbID: String,
  Type: String,
  Poster: String
});

var Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
