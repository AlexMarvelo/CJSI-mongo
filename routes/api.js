const db = require('../db/db');
const utils = require('./utils');

module.exports = (router, passport) => {

  // servises:
  router.get('/search', utils.isLoggedIn, (req, res) => {
    utils.getSearchRequestData(req.query)
      .then(JSON.stringify)
      .then(data => res.send(data))
      .catch(error => {
        res.send({ status: 500, error });
        throw error;
      });
  });


  router.all('/movie/:movieID/:action', utils.isLoggedIn, function(req, res) {
    switch (req.params.action) {

    case 'get':
      utils.getMovieByID(req.params.movieID)
        .then(JSON.stringify)
        .then(data => res.send(data))
        .catch(error => {
          res.send({ status: 500, error });
          throw error;
        });
      break;

    case 'addtofavs':
      utils.addFavToUser(req, res, req.user, req.params.movieID);
      break;

    case 'removefromfavs':
      utils.removeFavFromUser(req, res, req.user, req.params.movieID);
      break;

    default:
      res.redirect('/');
      throw new Error('Wrong request path');
    }
  });


  router.all('/status/:action', (req, res) => {
    switch (req.params.action) {

    case 'dbconnection':
      res.send({dbconnected: db.readyState});
      break;

    default:
      res.redirect('/');
      throw new Error('Wrong request path');
    }
  });


  router.post('/user/login', utils.isLoggedOut,
    passport.authenticate('local-login', {
      failureFlash : true
    }),
    (req, res) => {
      res.send(req.user);
    }
  );

  router.post('/user/signup', utils.isLoggedOut,
    passport.authenticate('local-signup', {
      failureFlash : true
    }),
    (req, res) => {
      res.send(req.user);
    }
  );

  router.all('/user/:action', utils.isLoggedIn,
    (req, res) => {
      switch (req.params.action) {

      case 'get':
        res.send(req.user);
        break;

      case 'logout':
        req.logout();
        res.redirect('/login');
        break;

      default:
        res.redirect('/');
        throw new Error('Wrong request path');
      }
    }
  );


  router.all('/comments/:action', utils.isLoggedIn,
    (req, res) => {
      switch (req.params.action) {

      case 'add':
        if (!req.body.movieID || !req.body.text || !req.body.timestamp) {
          res.send({ status: 500, message: 'Wrong request data' });
          throw new Error('Wrong request data');
        }
        req.body.userID = req.user.local.email;
        utils.addComment(req, res, req.body);
        break;

      case 'remove':
        if (!req.body.movieID || !req.body.timestamp) {
          res.send({ status: 500, message: 'Wrong request data' });
          throw new Error('Wrong request data');
        }
        req.body.userID = req.user.local.email;
        utils.removeComment(req, res, req.body);
        break;

      default:
        res.redirect('/');
        throw new Error('Wrong request path');
      }
    }
  );
};
