var MongoClient = require('mongodb').MongoClient;
var redis = require('redis');
var async = require('async');

var weight = require('./batch_weight');
var verb = require('./batch_verb');
var code = require('./batch_code');
var url = require('./batch_url');

var dbUrl = 'mongodb://localhost:27017/lambda';

MongoClient.connect(dbUrl, function(err, db) {
	console.log('Generating batch views');

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
			var client = redis.createClient();
			client.on('connect', function() {
				client.del('code_d');
				client.del('code_h');
				client.del('code_m');
				client.del('url_d');
				client.del('url_h');
				client.del('url_m');
				client.del('verb_d');
				client.del('verb_h');
				client.del('verb_m');
				client.del('weight_d');
				client.del('weight_h');
				client.del('weight_m');
				client.quit();
			});
			console.log("End of batch layer processing : Closing database");
			db.close();
		});
});