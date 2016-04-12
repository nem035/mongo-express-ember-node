'use strict';

module.exports = function(Mongoose, options) {
  
  const schema = {
    name  : String,
    email : String
  };
  
  return new Mongoose.Schema(schema, options);
}