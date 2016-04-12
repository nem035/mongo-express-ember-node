'use strict';

const { join: joinPaths } = require('path');
const HOME_DIR = process.cwd();
const loadTopLevelModule = (name) => require(joinPaths(HOME_DIR, name));

module.exports = function (data, cb) {
	  
  const { deserialize } = loadTopLevelModule('serializer')();

  return new Promise((resolve, reject) => {
    deserialize(data, (err, content) => {
      if (err) {
        reject(err);
      } else {
        resolve(content);
      }
    });
  });
}