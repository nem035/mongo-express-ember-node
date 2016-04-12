'use strict';

const express = require('express');

const { join: joinPaths } = require('path');
const HOME_DIR = process.cwd();
const loadTopLevelModule = (name) => require(joinPaths(HOME_DIR, name));

const app = express();
const setup = loadTopLevelModule('setup');

module.exports = setup(app);