var MongoClient = require('mongodb').MongoClient;
var async = require('async');

var weight = require('./batch_weight');
var verb = require('./batch_verb');
var code = require('./batch_code');
var url = require('./batch_url');

var dbUrl = 'mongodb://localhost:27017/lambda';

MongoClient.connect(dbUrl, function(err, db) {

	async.parallel([
			verb.generate.bind(null, db),
			weight.generate.bind(null, db),
			code.generate.bind(null, db),
			url.generate.bind(null, db),
		],
		function(err, results) {
			if (err) {
				console.log(err);
			}

			console.log("End of batch layer processing : Closing database");
			db.close();
		});
});