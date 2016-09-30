Full stack app sample using the MEEN stack (Mongo, Express, Ember, Node)
==================================

This is basic implementation of a full stack web app using Mongo, Ember and Express.

The Mongo-backed Express server is in `./server` and the Ember app is in `./client`

**Server Dependencies:**

- CORS support via [cors](https://github.com/troygoode/node-cors)
- Body Parsing via [body-parser](https://github.com/expressjs/body-parser)
- JSON API serialization via [json-api-ify](https://github.com/kutlerskaggs/json-api-ify)
- MongoDB communication via [mongoose](https://github.com/Automattic/mongoose)
- String pluralization for REST resources via [pluralize](https://github.com/blakeembrey/pluralize)

Getting Started
---------------

Clone the repo and make it your own:
```sh
git clone git@github.com:nem035/mongo-express-ember-node.git
cd mongo-express-ember-node
rm -rf .git && git init && npm init
```

Create a `_config` folder at the top level of `./server` with `development.json` inside, holding your config. The json should look like:
```json
{
  "HOST"   : "http://localhost",
  "PORT"   : 3000,
  "NAME"   : "{app name}}",
  "DB_URI" : "{mongo db url}"
} 
```
Install `npm` dependencies
```sh
cd server && npm install
cd ..
cd client && npm install
```
Run it:
```sh
cd server && npm start
cd ..
cd client && ember s
```

License
-------

MIT
