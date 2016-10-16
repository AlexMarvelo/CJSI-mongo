var express = require('express');
var router = express.Router();

var props = {
  appTitle: 'OMDb Hero',
}

/* GET home page. */
router.get('/', function(req, res, next) {
  props.pageTitle = 'OMDb Hero | Home'
  res.render('index', props)
});

module.exports = router;
