// UserController.js
var express = require('express');
var router = express.Router()
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// strip docker log header
router.post('/docker/stripheader', function (req, res) {
    if (req.body.log != undefined) {
        var log = req.body.log.split('\n');
        var loglines = [];
        log.forEach(element => {
            loglines.push(element.substr(8));       
        });
        res.status(200).send({
            log: loglines.join('\n')
        })
    } else {
        res.status(204).send();
    }
});

module.exports = router;