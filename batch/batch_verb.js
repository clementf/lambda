var MongoClient = require('mongodb').MongoClient;
var async = require('async');


exports.generate = function(db, callback) {

	var template = JSON.parse(JSON.stringify(require('./template').template));

	var logs = db.collection('logs_raw');
	var verb_m = db.collection('verb_m');
	verb_m.remove();
	var verb_h = db.collection('verb_h');
	verb_h.remove();
	var verb_d = db.collection('verb_d');
	verb_d.remove();


	/**
	 * BY MINUTES
	 */

	var c_m = function(callback) {
		console.log('Calling verb for minute');


		template[0].$project.verb = "$verb";
		template[1].$group._id.verb = "$verb";
		template[1].$group.count = {
			$sum: 1
		};

		logs.aggregate(template).toArray(function(err, results) {
			async.each(results, function(res, cb) {
				verb_m.save(res, function(err, res) {
					if (!err)
						cb();
					else
						cb(err);
				});
			}, function(err) {
				if (err)
					callback(err);
				else
					callback(null);
			});
		});
	};

	/**
	 * BY HOUR
	 */

	var c_h = function(callback) {
		console.log('Calling verb for hours');

		delete template[1].$group._id.minute;

		logs.aggregate(template).toArray(function(err, results) {
			async.each(results, function(res, cb) {
				verb_h.save(res, function(err, res) {
					if (!err)
						cb();
					else
						cb(err);
				});
			}, function(err) {
				if (err)
					callback(err);
				else
					callback(null);
			});
		});
	};


	/**
	 * BY DAY
	 */

	var c_d = function(callback) {
		console.log('Calling verb for days');

		delete template[1].$group._id.hour;

		logs.aggregate(template).toArray(function(err, results) {
			async.each(results, function(res, cb) {
				verb_d.save(res, function(err, res) {
					if (!err)
						cb();
					else
						cb(err);
				});
			}, function(err) {
				if (err)
					callback(err);
				else
					callback(null);
			});
		});
	};



	async.parallel([
			c_m,
			c_h,
			c_d
		],
		function(err, results) {
			callback(err);
		});
};