const db = require('../db/db');
const utils = require('./utils');

module.exports = (router, passport) => {

  // servises:
  router.get('/search', utils.isLoggedIn, (req, res) => {
    utils.getSearchRequestData(req.query)
      .then(JSON.stringify)
      .then(data => res.send(data))
      .catch(error => {
        res.send(error);
        console.error(error);
      });
  });


  router.all('/movie/:movieID/:action', utils.isLoggedIn, function(req, res) {
    switch (req.params.action) {

    case 'get':
      utils.getMovieByID(req.params.movieID)
        .then(JSON.stringify)
        .then(data => res.send(data))
        .catch(error => {
          res.send(error);
          console.error(error);
        });
      break;

    case 'addtofavs':
      console.log(`- add ${req.params.movieID} to favs of ${req.user.local.email}`);
      utils.addFavToUser(res, req.user, req.params.movieID);
      break;

    case 'removefromfavs':
      console.log(`- remove ${req.params.movieID} from favs of ${req.user.local.email}`);
      utils.removeFavFromUser(res, req.user, req.params.movieID);
      break;

    default:
      utils.getMovieByID(req.query.i)
        .then(JSON.stringify)
        .then(data => res.send(data))
        .catch(error => {
          res.send(error);
          console.error(error);
        });
    }
  });


  router.all('/status/:action', (req, res) => {
    switch (req.params.action) {
    case 'dbconnection':
      res.send({dbconnected: db.readyState});
      break;
    default:
      res.send({dbconnected: db.readyState});
    }
  });


  router.post('/user/login',
    passport.authenticate('local-login', {
      failureFlash : true
    }),
    (req, res) => {
      res.send(req.user);
    }
  );

  router.post('/user/signup',
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
        res.send(req.user);
      }
    }
  );
};
