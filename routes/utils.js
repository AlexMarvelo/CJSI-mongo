const fetch = require('node-fetch');
const OMDbURL = require('../config/app.config.json').remoteBaseURL;
const db = require('../db/db');
const Movie = require('../models/movie');
const itemsPerPage = 10;
const utils = {};

let props = {
  pageTitle: 'OMDb Hero'
};


utils.isLoggedIn = (req, res, next) => {
  console.log(`- private route requested. isAuthenticated = ${req.isAuthenticated()}`);
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
};


utils.isLoggedOut = (req, res, next) => {
  console.log(`- login/signup route requested. isAuthenticated = ${req.isAuthenticated()}`);
  if (!req.isAuthenticated()) return next();
  res.redirect('/');
};


utils.renderApp = (res) => {
  res.render('index', props);
};


utils.getMovieByID = (id) => {
  return utils.getRequestedDataFromOMDb(`/?i=${id}`);
};


utils.getSearchRequestData = (qObj) => {
  if (!db.readyState) return utils.getRequestedDataFromOMDb(`/${utils.getQString(qObj)}`);

  let dbQuery = {
    Title: new RegExp(`.*${qObj.s}.*`, 'i')
  };
  if (qObj.y) dbQuery.Year = qObj.y;
  if (qObj.type) dbQuery.Type = qObj.type;
  let page = qObj.page || 1;
  return Movie.find(dbQuery).exec()
    .then(movies => {
      if (!movies.length) {
        return utils.getRequestedDataFromOMDb(`/${utils.getQString(qObj)}`);
      }
      return {
        Search: movies.slice((page-1)*itemsPerPage, page*itemsPerPage),
        totalResults: movies.length,
        Response: 'True'
      };
    });
};

utils.getQString = (qObj) => {
  let qString = '?';
  for (let prop in qObj) {
    qString += `${prop}=${qObj[prop]}&`;
  }
  qString = qString.slice(0, -1).replace(' ', '+');
  return qString;
};


utils.getRequestedDataFromOMDb = (query) => {
  return fetch(OMDbURL + query)
    .then(res => res.text())
    .then(JSON.parse)
    .then(data => {
      data.remoteSourse = true;
      return data;
    });
};

module.exports = utils;
