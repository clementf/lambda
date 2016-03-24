var MongoClient = require('mongodb').MongoClient;
var async = require('async');
var template = require('./template').template;


exports.generate = function(db, callback) {

	var logs = db.collection('logs_raw');
	var url_m = db.collection('url_m');
	url_m.remove();
	var url_h = db.collection('url_h');
	url_h.remove();
	var url_d = db.collection('url_d');
	url_d.remove();


	/**
	 * BY MINUTES
	 */

	var c_m = function(callback) {
		console.log('Calling url for minute');
				
		template[1].$group.count = {
			$sum: 1
		};

		logs.aggregate(template).toArray(function(err, results) {
			async.each(results, function(res, cb) {
				url_m.save(res, function(err, res) {
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
		console.log('Calling url for hours');

		delete template[1].$group._id.minute;

		logs.aggregate(template).toArray(function(err, results) {
			async.each(results, function(res, cb) {
				url_h.save(res, function(err, res) {
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
		console.log('Calling url for days');

		delete template[1].$group._id.hour;

		logs.aggregate(template).toArray(function(err, results) {
			async.each(results, function(res, cb) {
				url_d.save(res, function(err, res) {
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