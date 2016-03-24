var MongoClient = require('mongodb').MongoClient;
var async = require('async');
exports.generate = function(db, callback) {

	var logs = db.collection('logs_raw');
	var weight_m = db.collection('weight_m');
	var weight_h = db.collection('weight_h');
	var weight_d = db.collection('weight_d');

	/**
	 * BY MINUTES
	 */

	var q_m = function(callback) {
		console.log('Calling weight for minutes');
		logs.aggregate([{
			$match: {
				"weight": {
					$ne: 0
				}
			}
		}, {
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
				"weight": 1

			}
		}, {
			$group: {
				"_id": {
					"minutes": "$theminutes",
					"hour": "$thehour",
					"day": "$theday",
					"month": "$themonth"
				},
				"avg_weight": {
					$avg: "$weight"
				}
			}
		}]).toArray(function(err, results) {
			async.each(results, function(res, cb) {
				weight_m.save(res, function(err, res) {
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

	var q_h = function(callback) {
		console.log('Calling weight for hours');
		logs.aggregate([{
			$match: {
				"weight": {
					$ne: 0
				}
			}
		}, {
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
				"weight": 1

			}
		}, {
			$group: {
				"_id": {
					"hour": "$thehour",
					"day": "$theday",
					"month": "$themonth"
				},
				"avg_weight": {
					$avg: "$weight"
				}
			}
		}]).toArray(function(err, results) {
			async.each(results, function(res, cb) {
				weight_h.save(res, function(err, res) {
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

	var q_d = function(callback) {
		console.log('Calling weight for days');
		logs.aggregate([{
			$match: {
				"weight": {
					$ne: 0
				}
			}
		}, {
			$project: {
				"themonth": {
					$month: "$date"
				},
				"theday": {
					$dayOfMonth: "$date"
				},
				"weight": 1

			}
		}, {
			$group: {
				"_id": {
					"day": "$theday",
					"month": "$themonth"
				},
				"avg_weight": {
					$avg: "$weight"
				}
			}
		}]).toArray(function(err, results) {
			async.each(results, function(res, cb) {
				weight_d.save(res, function(err, res) {
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
			q_m,
			q_d,
			q_h
		],		
		function(err, results) {
			callback(err);
		});
};