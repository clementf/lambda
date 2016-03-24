var MongoClient = require('mongodb').MongoClient;
var async = require('async');
exports.generate = function(db, callback) {

	var logs = db.collection('logs_raw');
	var url_m = db.collection('url_m');
	var url_h = db.collection('url_h');
	var url_d = db.collection('url_d');

	/**
	 * BY MINUTES
	 */

	var u_m = function(callback) {
		console.log('Calling url for minutes');
		logs.aggregate([{
			$project: {
				"theminutes": {
					$minute: "$date"
				},
				"thehour": {
					"$hour": "$date"
				},
				"themonth": {
					$month: "$date"
				},
				"theday": {
					$dayOfMonth: "$date"
				},				

			}
		}, {
			$group: {
				"_id": {					
					"minutes": "$theminutes",
					"hour": "$thehour",
					"day": "$theday",
					"month": "$themonth"
				},
				"count": {
					$sum: 1
				}
			}
		}]).toArray(function(err, results) {
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

	var u_h = function(callback) {
		console.log('Calling url for hours');
		logs.aggregate([{
			$project: {
				"thehour": {
					"$hour": "$date"
				},
				"themonth": {
					$month: "$date"
				},
				"theday": {
					$dayOfMonth: "$date"
				},				

			}
		}, {
			$group: {
				"_id": {					
					"hour": "$thehour",
					"day": "$theday",
					"month": "$themonth"
				},
				"count": {
					$sum: 1
				}
			}
		}]).toArray(function(err, results) {
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

	var u_d = function(callback) {
		console.log('Calling url for days');
		logs.aggregate([{
			$project: {
				"themonth": {
					$month: "$date"
				},
				"theday": {
					$dayOfMonth: "$date"
				},				

			}
		}, {
			$group: {
				"_id": {					
					"day": "$theday",
					"month": "$themonth"
				},
				"count": {
					$sum: 1
				}
			}
		}]).toArray(function(err, results) {
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
			u_m,
			u_d,
			u_h
		],
		function(err, results) {
			callback(err);
		});
};