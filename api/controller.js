var MongoClient = require('mongodb').MongoClient;
var redis = require('redis');

var getType = function(code, time) {
	var type;
	switch (code) {
		case 'code':
			switch (time) {
				case 'm':
					type = 'code_m';
					break;
				case 'h':
					type = 'code_h';
					break;
				case 'd':
					type = 'code_d';
					break;
			}
			break;
		case 'weight':
			switch (time) {
				case 'm':
					type = 'weight_m';
					break;
				case 'h':
					type = 'weight_h';
					break;
				case 'd':
					type = 'weight_d';
					break;
			}
			break;
		case 'verb':
			switch (time) {
				case 'm':
					type = 'verb_m';
					break;
				case 'h':
					type = 'verb_h';
					break;
				case 'd':
					type = 'verb_d';
					break;
			}
			break;
		case 'url':
			switch (time) {
				case 'm':
					type = 'url_m';
					break;
				case 'h':
					type = 'url_h';
					break;
				case 'd':
					type = 'url_d';
					break;
			}
			break;
	}
	return type;
}

var mergeViews = function(req, res, batch, speed) {
	var i = 0;
	while (i < batch.length) {
		if (speed.length == 0) {
			i = batch.length;
		} else {
			var j = 0;
			while (j < speed.length) {
				if (JSON.stringify(batch[i]._id) == JSON.stringify(speed[j]._id)) {
					batch[i].count += speed[j].count;
					speed.splice(j, 1);
					j = speed.length;
				} else {
					j++;
				}
			}
			i++;
		}
	}
	if (speed.length && batch.length) {
		mergedView = batch.concat(speed);
	} else if (batch.length) {
		mergedView = batch;
	} else if (speed.length) {
		mergedView = speed;
	} else {
		mergedView = [];
	}
	res.json(mergedView);
}

var getSpeedViews = function(batch, req, res, type) {
	var speed;
	var client = redis.createClient();
	client.on('connect', function() {
		client.get(type, function(err, reply) {
			var speedViews;
			if (!reply) {
				speedViews = {}
			} else {
				speedViews = JSON.parse(reply)
			}
			mergeViews(req, res, batch, speedViews);
		});
	});
}

var getMergedViews = function(req, res, type) {
	var dbUrl = 'mongodb://localhost:27017/lambda';

	MongoClient.connect(dbUrl, function(err, db) {

		var collection = db.collection(type);

		var batchViews;
		if (collection == undefined) {
			batchViews = [];
			getSpeedViews(batchViews, req, res, type);
		} else {
			collection.find().toArray(function(err, results) {
				if (!err) {
					batchViews = results;
				} else {
					batchViews = [];
				}
				getSpeedViews(batchViews, req, res, type);
			})
		}
	});
}

exports.handle = function(req, res) {
	var type = req.params.type;
	var time = req.params.time;
	var request = getType(type, time);
	if (request == undefined) {
		res.json({});
	} else {
		getMergedViews(req, res, request);
	}
}