const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = mongoose.connection;
const dbConfig = require('./db.config.json');
const initDB = require('./initDB');

mongoose.connect(dbConfig.url);

db.on('disconnected', function() {
  console.log('MongoDB disconnected');
  setTimeout(() => { mongoose.connect(dbConfig.url); }, dbConfig.reconnectInterval);
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
