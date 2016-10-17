var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var routes = require('./routes/routes');
var initDB = require('./initDB/initDB');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'images/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var db = mongoose.connection;
var dbURI = 'mongodb://localhost/omdb';

mongoose.connect(dbURI, {
  server: {
    reconnectTries: Number.MAX_VALUE
  }
});

db.on('disconnected', function() {
  console.log('MongoDB disconnected');
});

db.on('connected', function() {
  console.log('MongoDB connected');
});

db.on('reconnected', function() {
  console.log('MongoDB reconnected');
});

db.on('error', function() {
  app.use(function(req, res) {
    console.log('MongoDB error');
    var err = new Error('Database connection failed');
    res.render('error', {
      appTitle: 'OMDb Hero',
      pageTitle: 'OMDb Hero | Error',
      message: err.message,
      error: err
    });
  });
});

db.once('open', function() {
  console.log('MongoDB opened');
  initDB();
  app.use('/', routes);
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handlers

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res) {
      res.status(err.status || 500);
      res.render('error', {
        appTitle: 'OMDb Hero',
        pageTitle: 'OMDb Hero | Error',
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      appTitle: 'OMDb Hero',
      pageTitle: 'OMDb Hero | Error',
      message: err.message,
      error: {}
    });
  });
});

module.exports = app;
