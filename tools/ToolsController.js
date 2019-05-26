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
            var trimElem = element.substr(8);
            if (trimElem.trim() != '')
                loglines.push(trimElem);       
        });
        res.status(200).send({
            log: loglines.reverse().join('\n')
        })
    } else {
        res.status(204).send();
    }
});

module.exports = router;