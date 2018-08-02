var MongoConnection = require('./mongodb/MongoConnection'),
routeDonator = require('./DonatorRoutes'),
clientApp = require('../client/ClientApp'),
app = require('express')(),
server = require('http').Server(app);

app.io = require('socket.io')(server);
app.use('/api/donators', routeDonator);
app.use(clientApp);

server.listen(process.env.PORT || (process.argv[2] || process.env.npm_package_config_port), function () {
	MongoConnection.connect();
	console.log(server.address());
});

