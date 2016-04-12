'use strict';

const Serializer = require('json-api-ify');
const { plural } = require('pluralize');

const { join: joinPaths } = require('path');
const loadModule = (name) => require(joinPaths(__dirname, name));

let serializer;

module.exports = function(app, modelNames) {
  
  if (typeof serializer === 'object' && serializer !== null) {
    return serializer;
  }
  
  serializer = new Serializer({
      baseUrl: `${app.get('HOST')}/api`,
      topLevelMeta: {
          'api-version': 'v1.0.0'
      }
  });

  // setup individual model serializers
  modelNames.forEach(modelName => {
    const pluralModelName = plural(modelName);
    
    // define model serialization
    loadModule(modelName)(serializer, pluralModelName);
  });
  
  return serializer;
}