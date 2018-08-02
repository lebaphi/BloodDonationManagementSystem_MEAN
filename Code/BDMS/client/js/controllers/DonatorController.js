angular.module('bdms').controller('DonatorCtrl', ['$scope', '$rootScope', 'DonatorService', 'donator', '$location', 'MapService', 'SocketService',
  function($scope, $rootScope, DonatorService, donator, $location, MapService, SocketService) {
    $scope.donator = donator;
    $scope.saved = null;
    $scope.locationMode = false;
    $scope.isPhoneShown = false;

  $scope.showPhone = function () {
    $scope.isPhoneShown = true;
  };

  if (!donator.coordinates || !donator.address) {
    MapService.getAddress(donator.coordinates).then(function (result) {
      donator.coordinates = result.coordinates;
      donator.address = result.address;
    });
  }

  $scope.onSubmit = function (donator, form) {
    if (!form.$valid) return;
    if (donator._id) {
      DonatorService.update({ id:donator._id }, donator, function(data){
          $scope.msg = "Updated donator success";
          console.log(donator.msg + ", id: " +data._id);
        });

    }else {
        donator.$save(function(data){
          $scope.msg = "Created donator success";
          console.log(donator.msg + ", id: " +data._id);
        });
    }
  };

  $scope.onRemove = function () {
    if (!donator._id || !confirm('Are you sure?')) return;

    donator.$remove({ id:donator._id }, function () {
      $location.url('/');
    });
  };


  $scope.onLocation = function () {
    $scope.locationMode = true;
    $scope._originalDonator = angular.copy(donator);
    $rootScope.$emit('DonatorCtrl.showMarker', donator.coordinates);

    $scope._locationEvent = $rootScope.$on('DonatorCtrl.markerMoved', function ($event, pos) {
      MapService.getAddress(pos).then(function (result) {
        donator.coordinates = result.coordinates;
        donator.address = result.address;
      });
    });

  };

  $scope.cancelLocation = function () {
    $scope.donator = angular.copy($scope._originalDonator);
    $scope.locationMode = false;
    $rootScope.$emit('DonatorCtrl.hideMarker');

    if ($scope._locationEvent) $scope._locationEvent();
  };

  $scope.saveLocation = function () {
    delete $scope._originalDonator;
    $scope.locationMode = false;
    $rootScope.$emit('DonatorCtrl.hideMarker');

    if ($scope._locationEvent) $scope._locationEvent();
  };

  SocketService.on('onChanged', function (data) {
    if ($scope.donator._id !== data._id) return;

    $scope.donator = new DonatorService(data);
  });

  SocketService.on('onRemoved', function (id) {
    if ($scope.donator._id !== id) return;

    $location.url('/');
  });
}]);
