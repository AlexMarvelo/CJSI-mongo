const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const MongoStore  = require('connect-mongo')(session);
const dbConfig = require('./db/db.config.json');
const flash = require('connect-flash');

require('./db/db');

const app = express();

require('./config/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());

// required for passport session
app.use(session({
  secret: 'keyboard cat',
  saveUninitialized: true,
  resave: true,
  // using store session on MongoDB using express-session + connect
  store: new MongoStore({
    url: dbConfig.url,
    collection: 'sessions'
  })
}));
app.use(passport.initialize());
app.use(passport.session());
require('./routes/routes')(app, passport);

// error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  if (!err) return;
  console.error(err);
  res.redirect('/');
});

module.exports = app;
