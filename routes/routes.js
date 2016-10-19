const express = require('express');
const router = express.Router();
const db = require('../db/db');
const getSearchRequestData = require('../API/search');
const getMovieByID = require('../API/getMovieByID');

let props = {
  pageTitle: 'OMDb Hero'
};

module.exports = function(app, passport) {
  router.get('/', isLoggedIn, (req, res) => {
    if (req.query && req.query.s) {
      getSearchRequestData(req.query)
        .then(JSON.stringify)
        .then(data => res.send(data))
        .catch(error => {
          res.send(error);
          console.error(error);
        });
      return;
    }

    if (req.query && req.query.i) {
      getMovieByID(req.query.i)
        .then(JSON.stringify)
        .then(data => res.send(data))
        .catch(error => {
          res.send(error);
          console.error(error);
        });
      return;
    }

    renderApp(res);
  });

  router.get('/movie/:movieID', function(req, res) {
    renderApp(res);
  });

  router.get('/login', isLoggedOut, (req, res) => {
    renderApp(res);
  });

  router.get('/signup', isLoggedOut, (req, res) => {
    renderApp(res);
  });


  // utils
  router.all('/status/:action', (req, res) => {
    switch (req.params.action) {
    case 'dbconnection':
      res.send({dbconnected: db.readyState});
      break;
    default:
      res.send({dbconnected: db.readyState});
    }
  });

  router.all('/user/:action', function(req, res) {
    switch (req.params.action) {
    case 'get':
      res.send(req.user);
      break;
    case 'logout':
      req.logout();
      res.redirect('/login');
      break;
    default:
      res.send(req.user);
    }
  });

  router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/',
    failureRedirect : '/login',
    failureFlash : true
  }));

  router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/',
    failureRedirect : '/signup',
    failureFlash : true
  }));

  app.use(router);
};


function isLoggedIn(req, res, next) {
  console.log(`- private route requested. isAuthenticated = ${req.isAuthenticated()}`);
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

function isLoggedOut(req, res, next) {
  console.log(`- login/signup route requested. isAuthenticated = ${req.isAuthenticated()}`);
  if (!req.isAuthenticated()) return next();
  res.redirect('/');
}

function renderApp(res) {
  res.render('index', props);
}
