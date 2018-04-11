// UserController.js
var express = require('express');
var router = express.Router()
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var SmileP1 = require('../../lib/smileP1');

router.get('/', function (req, res) {
    var p1 = new SmileP1('qjldkxbw', '192.168.14.43');
    var result = p1.getMeter().then((result) => {
        res.status(200).send(result)
    });
});

module.exports = router;