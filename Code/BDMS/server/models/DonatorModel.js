var mongo = require('mongodb'),
	ID = mongo.ObjectID;

var Donators = {
	create: function (args, callback) {
		var collection = mongo.DB.collection('donators'),
			donator = args;
		
		collection.insertOne(donator, callback);
	},
	remove: function (donator, callback) {
		var collection = mongo.DB.collection('donators'),
			query = {_id: new ID(donator._id)};
		
		collection.deleteOne(query, callback);
	},
	findById: function (id, callback) {
		var collection = mongo.DB.collection('donators'),
			query = {_id: new ID(id)};
		
		collection.findOne(query, callback);
	},
	update: function (donator, callback) {
		var collection = mongo.DB.collection('donators'),
			query = {_id: new ID(donator._id)},
			options = {returnOriginal: false};
		
		delete donator._id;
		
		collection.findOneAndUpdate(query, donator, options, function (err, res) {
			callback(err, res.value);
		});
	},
	find: function (query, sort, callback) {
		var collection = mongo.DB.collection('donators');
		
		collection.find(query).sort(sort).toArray(callback);
	}
};

module.exports = Donators;