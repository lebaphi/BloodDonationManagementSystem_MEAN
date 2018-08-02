angular.module('bdms').directive('donatorMap', ['MapService', 'DonatorService', 'SocketService',
	function (MapService, DonatorService, SocketService) {
	return {
		restrict: 'A',
		link: function (scope, elem) {
			MapService.init("API_KEY").then(function () {
				scope.map = new MapService.api.Map(elem.get(0), {
					center: {lat: elem.data('center-lat') || 46.7651382, lng: elem.data('center-lng') || -92.2513077},
					zoom: elem.data('zoom') || 8,
					mapTypeControl: false,
					streetViewControl: false
		        });
				
				MapService.getLocation().then(function (pos) {
					scope.map.setCenter(pos);
				});
				
				MapService.api.event.addListener(scope.map, 'idle', function () {
					if (!scope.showAll) return;
					var bounds = scope.map.getBounds();
					if (scope._bounds && scope._bounds.equals(bounds)) return;
					
					scope._bounds = bounds;
					scope.$apply(function () {
						scope.updateMarkers(bounds);
					})
				});
				
			});
		},
		controller: function ($scope, $rootScope, $location) {
			$scope.showAll = true;
			
			$rootScope.$on('DonatorCtrl.showMarker', function ($event, pos) {
				$scope.showAll = false;
				$scope.hideMarkers($scope._markers);
				
				var pos = pos || $scope.map.getCenter();
				
				if (!$scope._locationMarker) {
					$scope._locationMarker = new MapService.api.Marker({
						position: pos,
						map: $scope.map,
						title: 'Your location',
						label: '!',
						animation: MapService.api.Animation.DROP,
						draggable: true
					});
					$scope._locationMarker.addListener('dragend', function () {
						$rootScope.$emit('DonatorCtrl.markerMoved', $scope._locationMarker.getPosition());
					})
				} else {
					$scope._locationMarker.setPosition(pos);
					$scope._locationMarker.setMap($scope.map);
				}
			});
			
			SocketService.on('onCreated', function (data) {
				if (!$scope.showAll) return;
				
				var donator = new DonatorService(data);
				$scope.createPin(donator, $scope.map, MapService.api.Animation.DROP);
				$scope._markers.push(donator);
			});
			
			SocketService.on('onChanged', function (data) {
				if (!$scope.showAll) return;
				
				var donator = $scope._markers.find(function (donator) {
					return donator._id === data._id;
				});
				if (donator) {
					var newDonator = new DonatorService(data);
					if (!donator.pin) {
						$scope.createPin(newDonator, $scope.map);
					} else {
						donator.pin.setLabel(newDonator.bloodGroup);
						donator.pin.setTitle(newDonator.getFullName());
						donator.pin.setPosition(newDonator.coordinates);
					}
				}
			});
			
			SocketService.on('onRemoved', function (id) {
				if (!$scope.showAll) return;
				
				var index = $scope._markers.findIndex(function (donator) {
					return donator._id === id;
				});
				
				if (index > -1) {
					$scope._markers[index].pin.setMap(null);
					$scope._markers.splice(index, 1);
				}
			});
			
			$rootScope.$on('DonatorCtrl.hideMarker', function (pos) {
				$scope._locationMarker.setMap(null);
				$scope.showAll = true;
				$scope.updateMarkers($scope.map.getBounds());
			});
			
			$scope.showMarkers = function (markers) {
				markers.forEach(function (marker) {
					if (!marker.pin) $scope.createPin(marker);
					marker.pin.setMap($scope.map);
				});
			};

			$scope.updateMarkers = function (bounds) {
				var boundsQuery = [bounds.getNorthEast(), bounds.getSouthWest()];

				DonatorService.query(boundsQuery).$promise.then(function (markers) {
					if ($scope._markers) {
						$scope.hideMarkers($scope._markers);
						$scope._markers = [];
					}

					$scope._markers = markers;

					$scope.showMarkers($scope._markers);

				});
			};

			$scope.hideMarkers = function (markers) {
				markers.forEach(function (marker) {
					if (marker.pin) {
						marker.pin.setMap(null);
					}
				});
			};

			$scope.createPin = function (donator, map, animation) {
				donator.pin = new MapService.api.Marker({
					position: donator.coordinates,
					map: map,
					title: donator.getFullName(),
					label: donator.bloodGroup,
					animation: animation
				});
				donator.pin.addListener('click', function() {
					$scope.$apply(function () {
						$location.url('/view/' + donator._id);
					});
				});
			};
		}
	};
}]);
