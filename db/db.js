const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const initDB = require('./initDB');

const db = mongoose.connection;
const dbURI = 'mongodb://localhost/omdb';
const reconnectInterval = 2000;

mongoose.connect(dbURI);

db.on('disconnected', function() {
  console.log('MongoDB disconnected');
  setTimeout(() => {mongoose.connect(dbURI);}, reconnectInterval);
});

db.on('connected', function() {
  console.log('MongoDB connected');
});

db.on('reconnected', function() {
  console.log('MongoDB reconnected');
});

db.on('error', function() {
  // app.use(function(req, res) {
  //   console.log('MongoDB error');
  //   var err = new Error('Database connection failed');
  // });
});

db.once('open', function() {
  console.log('MongoDB opened');
  initDB();
});

module.exports = db;
