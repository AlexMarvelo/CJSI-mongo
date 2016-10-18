const express = require('express');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

const router = express.Router();
const db = require('../db/db');
const getSearchRequestData = require('../API/search');
const getMovieByID = require('../API/getMovieByID');

let props = {
  pageTitle: 'OMDb Hero'
};

router.get('/', isLoggedIn, (req, res) => {
  if (req.query && req.query.s) {
    console.log('- get search');
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
    console.log('- get single');
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

router.get('/login', (req, res) => {
  renderApp(res);
});

router.get('/signup', (req, res) => {
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


// auth:
// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   }
// ));

// router.post('/login',
//   passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     // successFlash: true,
//     failureFlash: true
//   }),
//   (req, res) => { // eslint-disable-line no-unused-vars
//     req.flash();
//     // If this function gets called, authentication was successful.
//     // `req.user` contains the authenticated user.
//     console.log(req.user);
//   }
// );

function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();
  // if they aren't redirect them to the home page
  res.redirect('/login');
}

function renderApp(res) {
  res.render('index', props);
}

module.exports = router;
