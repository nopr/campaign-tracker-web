
var app = angular.module('app', []);
var api = 'http://xwing-campaign-tracker.herokuapp.com';

app.controller('main', ['$scope', '$http', function ($scope, $http) {

  $scope.factions = []

  $http.get(api+'/factions').success(function (data) {
    console.log(data)
    $scope.factions = data;
  });

}]);
