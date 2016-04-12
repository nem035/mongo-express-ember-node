'use strict';

const { join: joinPaths } = require('path');
const HOME_DIR = process.cwd();
const loadTopLevelModule = (name) => require(joinPaths(HOME_DIR, name));

module.exports = function (pluralResourceName, res, status = 200) {
	  
  const { serialize } = loadTopLevelModule('serializer')();

  return (err, response) => {
		if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    
    serialize(pluralResourceName, response, (err, payload) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      }
      
      res.status(status).json(payload);
    });
	};
}