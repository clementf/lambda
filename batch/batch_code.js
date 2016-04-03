var MongoClient = require('mongodb').MongoClient;
var async = require('async');


exports.generate = function(db, callback) {
	var template = JSON.parse(JSON.stringify(require('./template').template));		

	var logs = db.collection('logs_raw');
	var code_m = db.collection('code_m');
	code_m.remove();
	var code_h = db.collection('code_h');
	code_h.remove();
	var code_d = db.collection('code_d');
	code_d.remove();


	/**
	 * BY MINUTES
	 */

	var c_m = function(callback) {
		console.log('Calling code for minute');


		template[0].$project.code = "$code";
		template[1].$group._id.code = "$code";
		template[1].$group.count = {
			$sum: 1
		};

		logs.aggregate(template).toArray(function(err, results) {
			async.each(results, function(res, cb) {
				code_m.save(res, function(err, res) {
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
		console.log('Calling code for hours');

		delete template[1].$group._id.minute;

		logs.aggregate(template).toArray(function(err, results) {
			async.each(results, function(res, cb) {
				code_h.save(res, function(err, res) {
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
		console.log('Calling code for days');

		delete template[1].$group._id.hour;

		logs.aggregate(template).toArray(function(err, results) {
			async.each(results, function(res, cb) {
				code_d.save(res, function(err, res) {
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