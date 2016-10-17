var fetch = require('node-fetch');
var Movie = require('../models/movie');

var OMDbURL = 'http://www.omdbapi.com';

function getSearchRequestData(jObj) {
  var result = Movie.find({}).exec()
    .then(movies => {
      console.log(`results length: ${movies.length}`);
      if (!movies.length) result = getRequestedDataFormOMDb(jObj);
      return {
        Search: movies,
        totalResults: movies.length,
        Response: true
      };
    })
    .catch(console.error);
  return result;
}

function getRequestedDataFormOMDb(jObj) {
  return fetch(`${OMDbURL}/${getQString(jObj)}`)
    .then(res => res.text())
    .then(JSON.parse)
    .catch(console.error);
}

function getQString(jObj) {
  let qString = '?';
  for (let prop in jObj) {
    qString += `${prop}=${jObj[prop]}&`;
  }
  qString = qString.slice(0, -1).replace(' ', '+');
  return qString;
}

module.exports = getSearchRequestData;
