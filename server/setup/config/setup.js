'use strict';

const { join: joinPaths } = require('path');
const HOME_DIR = process.cwd();
const loadTopLevelModule = (name) => require(joinPaths(HOME_DIR, name));

module.exports = function(app, properties) {

  // extract process environment
  const { env, cwd } = process;
  const { NODE_ENV = 'development' } = env;
 
  // extract config from a local file based on the environment
  const localEnv = loadTopLevelModule('_config')(NODE_ENV);

  // extract config from the process environment
  const processConfig = {}, 
        localConfig = {};

  // build the config by merging the process config and local config
  // with the process config having precedence
  return properties.reduce((cfg, prop) => {
    const processEnvProp = env[prop];
    const localEnvProp = localEnv[prop];

    if (processEnvProp !== void 0 && processEnvProp !== null) {
      cfg[prop] = processEnvProp;
    } else {
      cfg[prop] = localEnvProp;
    }
    
    return cfg;
  }, {});
};