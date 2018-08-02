angular.module('bdms').factory('MapService', ['$q', '$window', function($q, $window) {
	var map = {
		api: null,
		geocoder: null,
		init: function (key) {
			if (this._initPromise) return this._initPromise; 
			
			this._initPromise = $q(function(resolve, reject) {
				jQuery.getScript('https://maps.googleapis.com/maps/api/js?key=' + key)
					.then(function () {
						map.api = $window.google.maps;
						map.geocoder = new map.api.Geocoder();
						resolve(map);
					}, reject);
			});
			return this._initPromise;
		},
		getLocation: function () {
			if (this._locationPromise) return this._locationPromise;
			
			this._locationPromise = $q(function(resolve, reject) {
				if (!$window.navigator.geolocation) return reject();
				
				$window.navigator.geolocation.getCurrentPosition(function(position) {
					var pos = {
							lat: position.coords.latitude,
							lng: position.coords.longitude
					};
					resolve(pos);
				});
			});
			return this._locationPromise;
		},
		getAddress: function (pos) {
			if (!pos) {
				pos = this.getLocation();
			}
			
			return $q.all([this.init(), pos]).then(function (result) {
				var map = result[0],
					pos = result[1];
				return $q(function(resolve, reject) {
					map.geocoder.geocode({'location': pos}, function(results, status) {
						if (status !== map.api.GeocoderStatus.OK) return reject(status);
						if (!results[0]) return reject('Address not found');
						resolve({coordinates: pos, address: results[0].formatted_address});
					});
				});
			});
		}
	};
	
	return map;
}]);