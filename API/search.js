var fetch = require('node-fetch');

function getSearchRequestData() {
  return fetch('http://www.omdbapi.com/?s=iron+man')
    .then(res => res.text())
    .then(JSON.parse);
}

module.exports = getSearchRequestData;
