'use strict';

const { Router } = require('express');

module.exports = function(app) {
	
  const routes = Router();
  
  // setup middleware here
  
  app.use(routes);

}