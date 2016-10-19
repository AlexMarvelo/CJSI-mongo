const getRequestedDataFromOMDb = require('./getRequestedDataFromOMDb');

function getMovieByID(id) {
  return getRequestedDataFromOMDb(`/?i=${id}`);
}

module.exports = getMovieByID;
