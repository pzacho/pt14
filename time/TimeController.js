// UserController.js
var express = require('express');
var router = express.Router()
var bodyParser = require('body-parser');
var moment = require('moment');
var Domoticz = require('../lib/domoticz.js');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Time = require('./Time');

// Get time code from server
router.get('/', function (req, res) {
    res.status(200).send({
        servertime: Date.now()
    })
});

// Get sunrise and sunset data from server
router.get('/sun', function(req, res) {
    // check if today's sunrise and -set is known
    var sun = req.app.get('sun');
    var domoticz = new Domoticz();
    if (sun === undefined) {
        domoticz.getSunriseSunset()
        .then((result) => {
            req.app.set('sun', result);
            res.status(200).send(result);
        },
        (reject) => {
            console.log(reject);
            res.set(404).send('Not found');
        })
    }
    else {
        if (moment().diff(sun.ServerTime, 'days') > 0) {
            // update sunrise and -set time
            domoticz.getSunriseSunset()
            .then((result) => {
                req.app.set('sun', result);
                res.status(200).send(result);
            },
            (reject) => {
                console.log(reject);
                res.set(404).send('Not found');
            })
        }
        else {
            // just return cached value
            res.status(200).send(req.app.get('sun'));
        }
    }
})

router.get('/brightness', function(req, res) {
    var sun = req.app.get('sun');
    
})

module.exports = router;