const express = require('express');
const router = express.Router();
const db = require('../db/db');
const getSearchRequestData = require('../API/search');
const getMovieByID = require('../API/getMovieByID');

let props = {
  pageTitle: 'OMDb Hero'
};

module.exports = function(app, passport) {
  router.get('/', isLoggedIn, (req, res, next) => {
    if (req.query && req.query.s) {
      console.log('- get search');
      getSearchRequestData(req.query)
        .then(JSON.stringify)
        .then(data => res.send(data))
        .catch(error => {
          res.send(error);
          console.error(error);
        });
      next();
    }

    if (req.query && req.query.i) {
      console.log('- get single');
      getMovieByID(req.query.i)
        .then(JSON.stringify)
        .then(data => res.send(data))
        .catch(error => {
          res.send(error);
          console.error(error);
        });
      next();
    }

    renderApp(res);
  });

  router.get('/login', isLoggedOut, (req, res) => {
    renderApp(res);
  });

  router.get('/signup', isLoggedOut, (req, res) => {
    renderApp(res);
  });


  // utils
  router.get('/isdbconnected', (req, res) => {
    res.send({dbconnected: db.readyState});
  });

  router.get('/movie/:movieID', function(req, res) {
    renderApp(res);
  });

  router.get('/islogined', function(req, res) {
    res.send({ isLogined: req.isAuthenticated()});
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

  router.post('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
  });

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
