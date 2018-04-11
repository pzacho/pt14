// app.js
var express = require('express');
var app = express();
var db = require('./db');

var UserController = require('./user/UserController');
app.use('/users', UserController);
var TimeController = require('./time/TimeController');
app.use('/time', TimeController);

module.exports = app;