const getRequestedDataFromOMDb = require('./getRequestedDataFromOMDb');
// const Movie = require('../models/movie');


function getMovieByID(id) {
  return getRequestedDataFromOMDb(`/?i=${id}`);
}

module.exports = getMovieByID;
