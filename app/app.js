
var app = angular.module('app', ['ngRoute']);
var api = 'http://xwing-campaign-tracker.herokuapp.com';

// Configuration
app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/view/main.html',
      controller: 'MainController'
    })
    .when('/players', {
      templateUrl: 'app/view/player.html',
      controller: 'PlayerController'
    })
    .when('/players/:id', {
      templateUrl: 'app/view/player.html',
      controller: 'PlayerController'
    })
    .when('/factions', {
      templateUrl: 'app/view/faction.html',
      controller: 'FactionController'
    })
    .when('/factions/:slug', {
      templateUrl: 'app/view/faction.html',
      controller: 'FactionController'
    });
});

// Directive: navigation
app.directive('navigation', ['$http', function ($http) {
  return {
    templateUrl: 'app/view/navigation.html',
    scope: '='
  }
}]);

// Controller: Main
app.controller('MainController', ['$scope', '$http', function ($scope, $http) {

  // Get the factions
  $http.get(api+'/faction').success(function (data) {
    $scope.factions = data;
  });
  // Get the players
  $http.get(api+'/player').success(function (data) {
    $scope.players = data;
  });

}]);

// Controller: Faction
app.controller('FactionController', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {

  // Get the factions
  $http.get(api+'/faction').success(function (data) {
    $scope.factions = data;
  });
  // Get the players
  $http.get(api+'/player').success(function (data) {
    $scope.players = data;
  });

  // Single faction, get data
  if ($routeParams.slug) {
    $http.get(api+'/faction/'+$routeParams.slug).success(function (data) {
      $scope.faction = data;
    });
  }

  $scope.addFaction = function () {
    var form = this;
    $http.post(api+'/faction/', form.data).success(function (data) {
      form.data = null;
      $http.get(api+'/faction/').success(function (data) {
        $scope.factions = data;
      });
    });
  }
  $scope.removeFaction = function (id) {
    $http.delete(api+'/faction/'+id).success(function (data) {
      $http.get(api+'/faction/').success(function (data) {
        $scope.factions = data;
      });
    });
  }

}]);

// Controller: Player
app.controller('PlayerController', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {

  // Get the factions
  $http.get(api+'/faction').success(function (data) {
    $scope.factions = data;
  });
  // Get the players
  $http.get(api+'/player').success(function (data) {
    $scope.players = data;
  });

  // Single faction, get data
  if ($routeParams.slug) {
    $http.get(api+'/player/'+$routeParams.slug).success(function (data) {
      $scope.player = data;
    });
  }

  $scope.addPlayer = function () {
    var form = this;
    $http.post(api+'/player/', form.data).success(function (data) {
      form.data = null;
      $http.get(api+'/player/').success(function (data) {
        $scope.players = data;
      });
    });
  }
  $scope.removePlayer = function (id) {
    $http.delete(api+'/player/'+id).success(function (data) {
      $http.get(api+'/player/').success(function (data) {
        $scope.players = data;
      });
    });
  }

}]);
