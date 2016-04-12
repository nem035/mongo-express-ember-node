'use strict';

const assert = require('assert');

const { join: joinPaths } = require('path');
const loadModule = (name) => require(joinPaths(__dirname, name));

module.exports = function(app) {
  
  const DB_URI = app.get('DB_URI');
  assert(DB_URI, 'Missing Database URI');
  
  const Mongoose = require('mongoose').connect(DB_URI);
  
  Mongoose.connection.on('error', error => {
    console.log('MongoDB Connection Error: ', error);
  });
  
  Mongoose.connection.on('open', () => {
    console.log('MongoDB Connection established.');
  });
  
  return {
    Mongoose
  };
}