'use strict';

const { join: joinPaths } = require('path');
const HOME_DIR = process.cwd();
const loadModule = (name) => require(joinPaths(__dirname, name));

// properties that will be loaded from the config
const configProperties = ['HOST', 'PORT', 'NAME', 'DB_URI'];

// properties that will be assigned to the express app using app.set()
const appProperties = ['HOST', 'PORT', 'NAME', 'DB_URI'];

// setup the config and 
// assign appProperties to the express instance
module.exports = function(app) {
  
  const config = loadModule('setup')(app, configProperties);

  appProperties.forEach(p => app.set(p, config[p]));

  return config;
};