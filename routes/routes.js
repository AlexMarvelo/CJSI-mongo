var express = require('express');
var router = express.Router();
var getSearchRequestData = require('../API/search');

var props = {
  appTitle: 'OMDb Hero',
};

/* GET home page. */
router.get('/', function(req, res) {
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
  props.pageTitle = 'OMDb Hero | Home';
  res.render('index', props);
});

module.exports = router;
