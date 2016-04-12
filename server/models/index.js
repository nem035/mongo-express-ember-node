'use strict';
const { isArray } = Array;
const { join: joinPaths } = require('path');
const loadModule = (name) => require(joinPaths(__dirname, name));

/**
 * Iterates through the modelNames,
 * loading each schema, instantiating with timestamps equal true
 * returns an array of all model instances
 */

let models;

module.exports = function(Mongoose, modelNames) {

  if (isArray(models)) {
    return models;
  }
  
  models = modelNames.map(name => {    
    const schema = loadModule(name)(Mongoose, { timestamps: true });
    const model = Mongoose.model(name, schema);
    return model;
  });
  
  return models;
}