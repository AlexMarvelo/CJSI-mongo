var fetch = require('node-fetch');
var Movie = require('../models/movie');

var OMDbURL = 'http://www.omdbapi.com';

function getSearchRequestData(qObj) {
  var dbQuery = {
    Title: new RegExp(`.*${qObj.s}.*`, 'i')
  };
  return Movie.find(dbQuery).exec()
    .then(movies => {
      if (!movies.length) {
        return getRequestedDataFromOMDb(qObj);
      }
      return {
        Search: movies,
        totalResults: movies.length,
        Response: 'True'
      };
    });
}

function getRequestedDataFromOMDb(qObj) {
  return fetch(`${OMDbURL}/${getQString(qObj)}`)
    .then(res => res.text())
    .then(JSON.parse);
}

function getQString(qObj) {
  let qString = '?';
  for (let prop in qObj) {
    qString += `${prop}=${qObj[prop]}&`;
  }
  qString = qString.slice(0, -1).replace(' ', '+');
  return qString;
}

module.exports = getSearchRequestData;
