var fetch = require('node-fetch');
var OMDbURL = 'http://www.omdbapi.com';

function getSearchRequestData(jObj) {
  return fetch(`${OMDbURL}/${getQString(jObj)}`)
    .then(res => res.text())
    .then(JSON.parse);
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
