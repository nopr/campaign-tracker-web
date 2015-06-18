
var app = angular.module('app', ['ngRoute']);
var api = 'http://xwing-campaign-tracker.herokuapp.com';

// Configuration
app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/app/view/main.html',
      controller: 'MainController'
    })
    .when('/players', {
      templateUrl: '/app/view/player.html',
      controller: 'PlayerController'
    })
    .when('/players/:id', {
      templateUrl: '/app/view/player.html',
      controller: 'PlayerController'
    })
    .when('/factions', {
      templateUrl: '/app/view/faction.html',
      controller: 'FactionController'
    })
    .when('/factions/:slug', {
      templateUrl: '/app/view/faction.html',
      controller: 'FactionController'
    });
});

// Directive: navigation
app.directive('navigation', ['$http', function ($http) {
  return {
    templateUrl: '/app/view/navigation.html',
    scope: '=',
    link: function (scope, element) {
      // Arrays
      scope.factions = []
      scope.players = []
      // Get the factions
      $http.get(api+'/faction').success(function (data) {
        scope.factions = data;
      });
      // Get the players
      $http.get(api+'/player').success(function (data) {
        scope.players = data;
      });
    }
  }
}]);

// Controller: Main
app.controller('MainController', ['$scope', '$http', function ($scope, $http) {

  console.log('main controller')

}]);

// Controller: Faction
app.controller('FactionController', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {

  // Single faction, get data
  if ($routeParams.slug) {
    console.log('one faction')
    $http.get(api+'/faction/'+$routeParams.slug).success(function (data) {
      $scope.faction = data;
    });
  } else {
    console.log('all factions')
    console.log($scope.factions)
  }

  $scope.addplayer = function () {
    $http.post(api+'/faction/', $scope.new_faction).success(function (data) {
      $scope.factions.push(data);
    });
  }

}]);

// Controller: Player
app.controller('PlayerController', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {

  // Single faction, get data
  if ($routeParams.slug) {
    console.log('one player')
    $http.get(api+'/player/'+$routeParams.slug).success(function (data) {
      $scope.player = data;
    });
  } else {
    console.log('all players')
    console.log($scope.players)
  }

  $scope.addplayer = function () {
    $http.post(api+'/player/', $scope.new_player).success(function (data) {
      $scope.players.push(data);
    });
  }

}]);
