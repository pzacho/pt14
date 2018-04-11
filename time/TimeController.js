// UserController.js
var express = require('express');
var router = express.Router()
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Time = require('./Time');

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
    res.status(200).send({
        servertime: Date.now()
    })
});

module.exports = router;