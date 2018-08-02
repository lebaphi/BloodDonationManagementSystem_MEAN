var DonatorModel = require('../models/DonatorModel');

exports.onMount = function(parent){
	this.io = parent.io;
};

exports.findLocation = function(req, res){
	var query = {};
	if (req.query[0] && req.query[1]) {
		var ne = JSON.parse(req.query[0]),
			sw = JSON.parse(req.query[1]);
		query = {
			'coordinates.lat': {
				$lte: ne.lat,
				$gte: sw.lat
			},
			'coordinates.lng': {
				$lte: ne.lng,
				$gte: sw.lng
			}
		};
	}

	DonatorModel.find(query, {}, function (err, result) {
		res.send(result);
	});
};

exports.createDonator = function(req, res){
	var donator = req.body;
	donator.ip = req.ip;
	DonatorModel.create(donator, function (err, result) {
		res.send(result.ops[0]);
		if (err) return;
		req.app.io.emit('onCreated', result.ops[0]);
	});
};

exports.paramsDonator = function(req, res, next, id){
	DonatorModel.findById(id, function (err, donator) {
		if (err) {
			res.status(500).send(err);
		} else if (!donator) {
			res.status(404).send({status: 404, error: 'Donator not found'});
		} else {
			req.donator = donator;
			next();
		}
	});
};

exports.getDonatorById = function(req, res){
	res.send(req.donator);
};

exports.updateDonatorById = function(req, res){
	var donator = req.body;
	donator._id = req.donator._id;
	donator.ip = req.ip;
	DonatorModel.update(donator, function (err, result) {
		res.send(result);
		if (err) return;
		req.app.io.emit('onChanged', result);
	});
};

exports.deleteDonatorById = function(req, res){
	DonatorModel.remove(req.donator, function (err) {
		res.send('removed');
		if (err) return;
		req.app.io.emit('onRemoved', req.donator._id);
	});
};


