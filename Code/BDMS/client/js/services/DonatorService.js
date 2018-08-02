angular.module('bdms').factory('DonatorService', ['$resource', function($resource) {

	//$resource returned a resource "class" object with default methods:
	//{ 'get':    {method:'GET'},
	//	'save':   {method:'POST'},
	//	'query':  {method:'GET', isArray:true},
	//	'remove': {method:'DELETE'},
	//	'delete': {method:'DELETE'} };

	//Declared PUT method
	var Donators = $resource('/api/donators/:id', null, {
        'update': { method:'PUT'}
    });
	
	Donators.prototype.getFullName = function () {
		return this.firstname + ' ' + this.lastname;
	};
	
	return Donators;
}]);