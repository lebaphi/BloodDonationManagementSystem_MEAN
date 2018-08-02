angular.module('bdms').factory('SocketService', ['$rootScope', function ($rootScope) {
	var server = io.connect();
	['onCreated', 'onChanged', 'onRemoved'].forEach(function (event) {
		server.on(event, function (data) {
			$rootScope.$emit('Socket.' + event, data);
		});
	});
	return {
		on: function(event, callback) {
			server.on(event, function() {
				var args = arguments;
				$rootScope.$apply(function () {
					callback.apply(server, args);
				});
			});
		},
		emit: function(event, data, callback) {
			server.emit(event, data, function () {
				var args = arguments;
				$rootScope.$apply(function () {
					if (callback) {
						callback.apply(server, args);
					}
				});
			});
		}
	};
}]);
