angular.module('bdms', ['ngRoute', 'ngResource']).config(function($routeProvider, $locationProvider) {
	$routeProvider.when('/', {
		templateUrl: './templates/PaneInfo.html'
	});
	
	$routeProvider.when('/manage/:donatorId', {
		templateUrl: './templates/DonatorFormReg.html',
		controller: 'DonatorCtrl',
		resolve: {
			donator: function ($route, $location, DonatorService) {
				var donator = DonatorService.get({id: $route.current.params.donatorId});
				donator.$promise.catch(function () {
					$location.url('/');
				});
				return donator;
			}
		}
	});
	
	$routeProvider.when('/view/:donatorId', {
		templateUrl: './templates/DonatorInfo.html',
		controller: 'DonatorCtrl',
		resolve: {
			donator: function ($route, $location, DonatorService) {
				var donator = DonatorService.get({id: $route.current.params.donatorId});
				donator.$promise.catch(function () {
					$location.url('/');
				});
				return donator;
			}
		}
	});
	
	$routeProvider.when('/register', {
		templateUrl: './templates/DonatorFormReg.html',
		controller: 'DonatorCtrl',
		resolve: {
			donator: function ($route, DonatorService) {
				return new DonatorService();
			}
		}
	});
	
	$routeProvider.otherwise({
		redirectTo: '/'
	});
	
	$locationProvider.html5Mode(true);
});