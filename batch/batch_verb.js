var MongoClient = require('mongodb').MongoClient;
var async = require('async');
exports.generate = function(db, callback) {

	var logs = db.collection('logs_raw');
	var verb_m = db.collection('verb_m');
	var verb_h = db.collection('verb_h');
	var verb_d = db.collection('verb_d');

	/**
	 * BY MINUTES
	 */

	var v_m = function(callback) {
		console.log('Calling verb for minutes');
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
				"verb": "$verb"

			}
		}, {
			$group: {
				"_id": {
					"verb": "$verb",
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

	var v_h = function(callback) {
		console.log('Calling verb for hours');
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
				"verb": "$verb"

			}
		}, {
			$group: {
				"_id": {
					"verb": "$verb",
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

	var v_d = function(callback) {
		console.log('Calling verb for days');
		logs.aggregate([{
			$project: {
				"themonth": {
					$month: "$date"
				},
				"theday": {
					$dayOfMonth: "$date"
				},
				"verb": "$verb"

			}
		}, {
			$group: {
				"_id": {
					"verb": "$verb",
					"day": "$theday",
					"month": "$themonth"
				},
				"count": {
					$sum: 1
				}
			}
		}]).toArray(function(err, results) {
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
			v_m,
			v_d,
			v_h
		],
		function(err, results) {
			callback(err);
		});
};