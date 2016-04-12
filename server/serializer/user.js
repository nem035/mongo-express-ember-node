'use strict';

const mongoose = require('mongoose');

module.exports = function(serializer, pluralModelName) {
  
  serializer.define(pluralModelName, {
    // the path to the primary key on the resource
    id: '_id',
    
    // an array of string paths to omit from the resource, this option
    // includes relationships that you may wish to omit
    blacklist: [],
    
    // an array of string paths to pick from the resource. this option
    // overrides any specified blacklist and also includes relationships
    whitelist: [],
    
    links: {
        self(resource, options, cb) {
            let link = options.baseUrl + '/users/' + resource.id;
            cb(null, link);
        }
    },
    
    // a map of meta members
    // meta: {
    //     self(resource, options, cb) {
    //         // each key can be a value to set, or asynchronous function that
    //         // receives the processed resource, serialization options, and
    //         // a callback that should pass any error and the meta value
    //         cb(null, meta);
    //     }
    // },
    
    // preprocess the resources
    processResource(resource /*, cb */) {
      if (typeof resource.toJSON === 'function') {
        resource = resource.toJSON();
      } else if (resource instanceof mongoose.Types.ObjectId) {
        resource = resource.toString();
      }
      return resource;
    },
    
    // relationship configuration
    relationships: {
        // each key represents a resource path that points to a
        // nested resource or collection of nested resources
        'groups': {
            // the type of resource
            type: 'groups',

            // whether or not to include the nested resource(s)
            include: true,

            // optionally specify a non-default schema to use
            schema: 'my-schema',

            // a map of links to define on the relationship object
            links: {
                self(resource, options, cb) {

                },
                related(resource, options, cb) {

                }
            }
        }
    },
    
    // // a map of top-level links
    topLevelLinks: {
      
        self(options, cb) {
            let link = options.baseUrl + '/users';
            cb(null, link);
        },
        
        next(options, cb) {
            let link = options.baseUrl + '/users';
            if (options.nextPage) {
                link += '?page=' + options.nextPage;
            }
            cb(null, link);
        }
    },
    
    // a map of top-level meta members
    topLevelMeta: {
        total(options, cb) {
            cb(null, options.total);
        }
    }
  }, function(err) {
      // check for definition errors
  });
}