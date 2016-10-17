var fetch = require('node-fetch');
// var Movie = require('../models/movie');

var OMDbURL = 'http://www.omdbapi.com';

function getMovieByID(id) {
  return getRequestedDataFromOMDb(id);
}

function getRequestedDataFromOMDb(id) {
  console.log(id);
  return fetch(`${OMDbURL}/?i=${id}`)
    .then(res => res.text())
    .then(JSON.parse);
}

module.exports = getMovieByID;
