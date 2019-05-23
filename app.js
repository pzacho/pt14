// app.js
var express = require('express');
var morgan = require('morgan');

var app = express();
var db = require('./db');

app.use(morgan('dev'));

var UserController = require('./user/UserController');
app.use('/users', UserController);
var TimeController = require('./time/TimeController');
app.use('/time', TimeController);
var UpdateController = require('./bus/update/UpdateController');
app.use('/bus/update', UpdateController);
var ToolsController = require('./tools/ToolsController');
app.use('/tools', ToolsController);

module.exports = app;