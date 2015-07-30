var express = require('express');
var router = express.Router();
var path = require('path');

/* GET emit page. */
var fs = require('fs');
/* GET emit page. */
router.get('/', function (req, res, next) {
	console.log(path.join(__dirname, './../public/jsons/config.json'));
    var config = JSON.parse(fs.readFileSync(path.join(__dirname, './../public/jsons/config.json')));
    res.render('emit', { title: 'Emitter', sizes: config.sizes, modes: config.modes, colors: config.colors, inits: config.inits});
});
module.exports = router;


