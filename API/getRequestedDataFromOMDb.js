const fetch = require('node-fetch');
const OMDbURL = require('../config/app.config.json').remoteBaseURL;

function getRequestedDataFromOMDb(query) {
  return fetch(OMDbURL + query)
    .then(res => res.text())
    .then(JSON.parse)
    .then(data => {
      data.remoteSourse = true;
      return data;
    });
}

module.exports = getRequestedDataFromOMDb;
