var mongo = require('mongodb'),
	mongoClient = mongo.MongoClient;

exports.connect = function (callback) {
	if (mongo.DB) {
		return mongo.DB;
	} else {
		const url = process.env.MONGOLAB_URI || process.env.DB || process.env.npm_package_config_db;
		
		if (!url)  {
			console.error('No database url specified.');
			process.exit(1);
		}

		mongoClient.connect(url, function (err, db) {
			if (err) {
				console.error('Cannot connect to MongoDB!');
				console.error(err);
				process.exit(1);
			} else {
				mongo.DB = db;
				if (callback) {
					callback(db);
				}
			}
		});
	}
};