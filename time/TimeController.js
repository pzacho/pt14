// UserController.js
var express = require('express');
var router = express.Router()
var bodyParser = require('body-parser');
var moment = require('moment');
//var Domoticz = require('../lib/domoticz.js');
var Sunrise = require('../lib/sunrise.js');
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

    var sunrise = req.app.get('sun');
    if (sunrise === undefined) {
        sunrise = new Sunrise();
        req.app.set('sun', sunrise);
    }

    var data = sunrise.getSunriseSunset()
    .then((response) =>
    {
        res.status(200).send(response);
    },
    (reject) => {
        res.status(404).send("Failed to update");
    })
})

router.get('/brightness', function(req, res) {
    // calculate brightness between 0 (full) and -0.95 (low)
    var bness = -0.95;

    // check if today's sunrise and -set is known
    var sunrise = req.app.get('sun');
    if (sunrise === undefined) {
        sunrise = new Sunrise();
        req.app.set('sun', sunrise);
    }
    sunrise.getSunriseSunset()
    .then((response) => {
        var midday = moment(response.Sunrise, "HH:mm");
        var sr = moment(response.Sunrise, "HH:mm");
        var ss = moment(response.Sunset, "HH:mm");
        var md2 = ss.diff(sr)/2000;
        midday.add(md2, 's');
        fact = Math.abs(moment().unix()-midday.unix())/md2;
        if (fact > 1) {
            fact = 1;
        }
        bness = Math.round(bness * fact * 100)/100;
        res.status(200).send(bness.toString());
    })
})

module.exports = router;