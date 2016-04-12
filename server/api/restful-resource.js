'use strict';

const { Router } = require('express');

const crudAliases = { 
  index  :'get', 
  list   :'get', 
  read   :'get', 
  create :'post', 
  update :'put',
  modify :'patch' 
};

const methodRequiresId = (method) => [
  'get', 'read', 'put', 'patch', 'modify', 'update', 'del', 'delete'
].includes(method);

module.exports = function(resource) {
  
  const { 
    resourceName,
    mergeParams = false, 
    middleware
  } = resource;
  
	const restfulResource = Router({ mergeParams });

	if (middleware) {
    restfulResource.use(middleware);
  }

	if (resource.load) {
		restfulResource.param(resourceName, function(req, res, next, id) {
			resource.load(req, id, function(err, data) {
				if (err) {
          return res.status(404).send(err);
        }
				req[resourceName] = data;
				next();
			});
		});
	}

	for (let key in resource) {
    
		let method = crudAliases[key] || key;
    
		if (typeof restfulResource[method] === 'function') {
      
			let url = methodRequiresId(key) ? `/:${resourceName}` : '/';
      restfulResource[method](url, resource[key]);
		}
	}

	return restfulResource;
};
