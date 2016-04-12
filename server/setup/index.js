'use strict';

const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');

const { join: joinPaths } = require('path');
const HOME_DIR = process.cwd();
const loadTopLevelModule = (name) => require(joinPaths(HOME_DIR, name));
const loadModule = (name) => require(joinPaths(__dirname, name));

const setupDb = loadTopLevelModule('db');
const setupMiddleware = loadTopLevelModule('middleware');
const setupModels = loadTopLevelModule('models');
const setupSerializers = loadTopLevelModule('serializer');
const setupAPI = loadTopLevelModule('api');

const setupConfig = loadModule('config');
const modelNames = loadModule('model-names');

module.exports = function(app) {
      
    // setup the config based on the environment
    setupConfig(app);  
    
    // 3rd party middleware
    app.use(cors({
      exposedHeaders: ['Link']
    }));

    app.use(bodyParser.json({
      limit : '100kb',
      type: 'application/vnd.api+json'
    }));

    // logger
    app.use(logger('dev'));
    
    // database
    const { Mongoose } = setupDb(app);
    
    // models
    setupModels(Mongoose, modelNames);

    // serializers
    setupSerializers(app, modelNames);
   
    // internal middleware
    setupMiddleware(app);

    // api router
    setupAPI(app);
    
    return app;
 };