var MongoClient = require('mongodb').MongoClient;
var async = require('async');
exports.generate = function(db, callback) {

	var logs = db.collection('logs_raw');
	var code_m = db.collection('code_m');
	var code_h = db.collection('code_h');
	var code_d = db.collection('code_d');

	/**
	 * BY MINUTES
	 */

	var c_m = function(callback) {
		console.log('Calling code for minutes');
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
				"code": "$code"

			}
		}, {
			$group: {
				"_id": {
					"code": "$code",
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
				"code": "$code"

			}
		}, {
			$group: {
				"_id": {
					"code": "$code",
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
		logs.aggregate([{
			$project: {
				"themonth": {
					$month: "$date"
				},
				"theday": {
					$dayOfMonth: "$date"
				},
				"code": "$code"

			}
		}, {
			$group: {
				"_id": {
					"code": "$code",
					"day": "$theday",
					"month": "$themonth"
				},
				"count": {
					$sum: 1
				}
			}
		}]).toArray(function(err, results) {
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
			c_d,
			c_h
		],
		function(err, results) {
			callback(err);
		});
};