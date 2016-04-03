var express = require('express');
var router = express.Router();
var controller = require('./controller');
var MongoClient = require('mongodb').MongoClient;

router.get('/api/:type/:time', controller.handle);




module.exports = router;


