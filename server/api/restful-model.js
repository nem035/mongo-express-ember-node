'use strict';
const { plural } = require('pluralize');

const { join: joinPaths } = require('path');
const loadModule = (name) => require(joinPaths(__dirname, name));

const restfulResource = loadModule('restful-resource');
const serializeResponse = loadModule('serialize-response');
const deserializeData = loadModule('deserialize-data');

const { Types: { ObjectId } } = require('mongoose');

const MAX_LIMIT = 50;
const MIN_LIMIT = 10;

module.exports = function(model) {
  
  const resourceName = model.modelName; 
  const pluralResourceName = plural(resourceName);
        
	return restfulResource({
		resourceName,

    // GET: to api/{resourceName}
		list({ params }, res) {
			const limit = Math.max(1, Math.min(MAX_LIMIT, params.limit|0 || MIN_LIMIT));
      const { search, start = 0 } = params;
      const language = 'en';
      const lean = true;
      
			// if fulltext search is enabled.
			if (search && typeof model.textSearch === 'function') {
				return model.textSearch(search, {
					limit,
					language,
					lean
				}, serializeResponse(pluralResourceName, res));
			}

			model.find({})
					 .skip(start | 0)
					 .limit(limit)
					 .exec(serializeResponse(pluralResourceName, res));
		},

    // POST: to api/{resourceName}
		create({ body }, res) {
      deserializeData(body).then(
        (content) => {
           model.create(content[pluralResourceName], serializeResponse(pluralResourceName, res));          
        },
        (err) => {
          console.error(err);
          res.status(500).send(err);
        }
      )
		},

    // GET: to api/{resourceName}/:resourceId
		read({ params }, res) {
      const id = ObjectId(params[resourceName]);
			model.findById(id, serializeResponse(pluralResourceName, res));
		},

    // PUT: to api/{resourceName}/:resourceId
		update({ body, params }, res) {
      const id = ObjectId(params[resourceName]);
			model.findByIdAndUpdate(id, { $set: body }, serializeResponse(pluralResourceName, res, 204));
		},
    
    // PATCH: to api/{resourceName}/:resourceId
		modify({ body, params }, res) {
      const id = ObjectId(params[resourceName]);
			model.findByIdAndUpdate(id, { $set: body }, serializeResponse(pluralResourceName, res, 204));
		},

    // DELETE: to api/{resourceName}/:resourceId
		delete({ params }, res) {
      const id = ObjectId(params[resourceName]);
			model.findByIdAndRemove(id, serializeResponse(pluralResourceName, res, 204));
		}
	});
}
