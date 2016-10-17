const express = require('express');
const router = express.Router();
const db = require('../db/db');
const getSearchRequestData = require('../API/search');
const getMovieByID = require('../API/getMovieByID');

let props = {
  pageTitle: 'OMDb Hero'
};

router.get('/', (req, res) => {
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

router.get('/isdbconnected', (req, res) => {
  res.send({dbconnected: db.readyState});
});

router.get('/movie/:movieID', function(req, res) {
  renderApp(res);
});

function renderApp(res) {
  res.render('index', props);
}

module.exports = router;
