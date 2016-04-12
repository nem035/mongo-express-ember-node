'use strict';

const { Router } = require('express');
const { plural } = require('pluralize');

const { join: joinPaths } = require('path');
const HOME_DIR = process.cwd();
const loadModule = (name) => require(joinPaths(__dirname, name));
const loadTopLevelModule = (name) => require(joinPaths(HOME_DIR, name));
const restfulModel = loadModule('restful-model');

module.exports = function(app) {
	const api = Router();

  const models = loadTopLevelModule('models')();

	// mount the restful models
  models.forEach(model => {
    let pluralModelName = plural(model.modelName);
    api.use(`/${pluralModelName}`, restfulModel(model));
  });
  
  app.use('/api', api);

}