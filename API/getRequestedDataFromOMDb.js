const fetch = require('node-fetch');
const OMDbURL = 'http://www.omdbapi.com';

function getRequestedDataFromOMDb(query) {
  return fetch(OMDbURL + query)
    .then(res => res.text())
    .then(JSON.parse);
}

module.exports = getRequestedDataFromOMDb;
