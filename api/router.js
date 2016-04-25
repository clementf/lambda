var express = require('express');
var router = express.Router();
var controller = require('./controller');
var MongoClient = require('mongodb').MongoClient;

//Bind one route, to the handle method of the controller (controller.js)
router.get('/api/:type/:time', controller.handle);


module.exports = router;


