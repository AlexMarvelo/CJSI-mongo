const db = require('../db/db');
const Movie = require('../models/movie');
const getRequestedDataFromOMDb = require('./getRequestedDataFromOMDb');

const itemsPerPage = 10;

function getSearchRequestData(qObj) {
  if (!db.readyState) return getRequestedDataFromOMDb(`/${getQString(qObj)}`);

  let dbQuery = {
    Title: new RegExp(`.*${qObj.s}.*`, 'i')
  };
  if (qObj.y) dbQuery.Year = qObj.y;
  if (qObj.type) dbQuery.Type = qObj.type;
  let page = qObj.page || 1;
  return Movie.find(dbQuery).exec()
    .then(movies => {
      if (!movies.length) {
        return getRequestedDataFromOMDb(`/${getQString(qObj)}`);
      }
      return {
        Search: movies.slice((page-1)*itemsPerPage, page*itemsPerPage),
        totalResults: movies.length,
        Response: 'True'
      };
    });
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
