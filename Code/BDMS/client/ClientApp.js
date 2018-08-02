var express = require('express'),
	path = require('path');

var client = express();

client.use('/vendors', express.static(path.join(__dirname, '../node_modules')));
client.use(express.static(path.join(__dirname, '../client')));
client.use(function (req, res) {
	res.sendFile(path.join(__dirname, '../index.html'));
});


module.exports = client;