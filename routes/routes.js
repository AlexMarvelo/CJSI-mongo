var express = require('express');
var router = express.Router();
var getSearchRequestData = require('../API/search');
var getMovieByID = require('../API/getMovieByID');

var props = {
  appTitle: 'OMDb Hero',
};

router.get('/', function(req, res) {
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

router.get('/movie/:movieID', function(req, res) {
  renderApp(res);
});

function renderApp(res) {
  res.render('index', props);
}

module.exports = router;
