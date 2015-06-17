
var app = angular.module('app', []);
var api = 'http://xwing-campaign-tracker.herokuapp.com';

app.controller('main', ['$scope', '$http', function ($scope, $http) {

  $scope.faction_form = null
  $scope.factions = []

  $http.get(api+'/faction').success(function (data) {
    $scope.factions = data;
  });

  $scope.addFaction = function (a, b) {
    var faction = {
      slug: $scope.faction_slug,
      name: $scope.faction_name
    };
    $http.post(api+'/faction/'+faction.slug, faction).success(function (data) {
      console.log(data);
      $scope.factions.push(data);
    });
  }

}]);
