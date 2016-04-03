var MongoClient = require('mongodb').MongoClient;

exports.handle = function(req, res) {

	var dbUrl = 'mongodb://localhost:27017/lambda';

	MongoClient.connect(dbUrl, function(err, db) {

		var type = req.params.type;
		var time = req.params.time;

		var collection;
		switch (type) {
			case 'code':
				switch (time) {
					case 'm':
						collection = db.collection('code_m');
						break;
					case 'h':
						collection = db.collection('code_h');
						break;
					case 'd':
						collection = db.collection('code_d');
						break;
				}
				break;
			case 'weight':
				switch (time) {
					case 'm':
						collection = db.collection('weight_m');
						break;
					case 'h':
						collection = db.collection('weight_h');
						break;
					case 'd':
						collection = db.collection('weight_d');
						break;
				}
				break;
			case 'verb':
				switch (time) {
					case 'm':
						collection = db.collection('verb_m');
						break;
					case 'h':
						collection = db.collection('verb_h');
						break;
					case 'd':
						collection = db.collection('verb_d');
						break;
				}
				break;
			case 'url':
				switch (time) {
					case 'm':
						collection = db.collection('url_m');
						break;
					case 'h':
						collection = db.collection('url_h');
						break;
					case 'd':
						collection = db.collection('url_d');
						break;
				}
				break;
		}

		if(collection == undefined){
			res.json({});
			return;
		}
		else{
			collection.find().toArray(function(err, results){
				if(!err){					
					res.json(results)
				}
			})
		}
		

		

	});
}