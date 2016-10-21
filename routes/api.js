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
        .then(movie => utils.loadCommentsToMovie(movie))
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
      let comment = req.body;
      switch (req.params.action) {

      case 'add':
        if (!comment.movieID || !comment.timestamp || !comment.text) {
          res.send({ status: 500, message: 'Wrong request data' });
          throw new Error('Wrong request data');
        }
        comment.userID = req.user.local.email;
        utils.addComment(req, res, comment);
        break;

      case 'remove':
        if (!comment.movieID || !comment.timestamp) {
          res.send({ status: 500, message: 'Wrong request data' });
          throw new Error('Wrong request data');
        }
        if (comment.userID != req.user.local.email) {
          res.send({ status: 5, message: 'Permision denied' });
          throw new Error('Permision denied');
        }
        comment.userID = req.user.local.email;
        utils.removeComment(req, res, comment);
        break;

      default:
        res.redirect('/');
        throw new Error('Wrong request path');
      }
    }
  );
};
