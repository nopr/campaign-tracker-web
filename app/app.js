
var app = angular.module('app', ['ngRoute']);
var uri = 'http://localhost:5000';
// var uri = 'http://xwing-campaign-tracker.herokuapp.com';

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
    .when('/factions/:id', {
      templateUrl: 'app/view/faction.html',
      controller: 'FactionController'
    })
    .when('/matches', {
      templateUrl: 'app/view/match.html',
      controller: 'MatchController'
    })
    .when('/matches/:id', {
      templateUrl: 'app/view/match.html',
      controller: 'MatchController'
    });
});

// Service: Api
app.factory('api', ['$http', function ($http) {
  var stored = {
    factions: 0,
    players: 0,
    matches: 0
  };
  var self = {};
  return function (resource, data) {
    if (data) {
      stored[resource] = data;
      return stored[resource];
    }
    if (!data) {
      return stored[resource];
    }
  }
}]);

// Directive: navigation
app.directive('navigation', ['$http', function ($http) {
  return {
    templateUrl: 'app/view/navigation.html',
    scope: '='
  }
}]);

// Controller: Main
app.controller('MainController', ['$scope', '$http', 'api', function ($scope, $http, api) {

  $http.get(uri+'/faction').success(function (data) {
    $scope.factions = api('factions', data);
  });
  $http.get(uri+'/player').success(function (data) {
    console.log('players', data)
    $scope.players = api('players', data);
  });
  $http.get(uri+'/match').success(function (data) {
    console.log('matches', data)
    $scope.matches = api('matches', data);
  });

}]);

// Controller: Faction
app.controller('FactionController', ['$scope', '$http', '$routeParams', 'api', function ($scope, $http, $routeParams, api) {

  $scope.factions = api('factions');
  $scope.players = api('players');
  $scope.matches = api('matches');

  // Single faction, get data
  if ($routeParams.id) {
    $http.get(uri+'/faction/'+$routeParams.id).success(function (data) {
      $scope.faction = data;
    });
  }

  $scope.addFaction = function () {
    var form = this;
    $http.post(uri+'/faction/', form.data).success(function (data) {
      form.data = null;
      $http.get(uri+'/faction/').success(function (data) {
        $scope.factions = api('factions', data);
      });
    });
  }
  $scope.editFaction = function () {
    var form = this.EditFaction;
    var supply = {
      name: $scope.faction.name,
      commander: $scope.faction.commander
    };
    $http.put(uri+'/faction/'+$scope.faction._id, supply).success(function (data) {
      $http.get(uri+'/faction/').success(function (data) {
        $scope.factions = api('factions', data);
        form.$setPristine();
      });
    });
  }
  $scope.removeFaction = function (id) {
    $http.delete(uri+'/faction/'+id).success(function (data) {
      $http.get(uri+'/faction/').success(function (data) {
        $scope.factions = api('factions', data);
      });
    });
  }

}]);

// Controller: Player
app.controller('PlayerController', ['$scope', '$http', '$routeParams', 'api', function ($scope, $http, $routeParams, api) {

  $scope.factions = api('factions');
  $scope.players = api('players');
  $scope.matches = api('matches');

  // Single player, get data
  if ($routeParams.id) {
    $http.get(uri+'/player/'+$routeParams.id).success(function (data) {
      $scope.player = data;
    });
  }

  $scope.addPlayer = function () {
    var form = this;
    $http.post(uri+'/player/', form.data).success(function (data) {
      form.data = null;
      $http.get(uri+'/player/').success(function (data) {
        $scope.players = api('players', data);
      });
    });
  }
  $scope.editPlayer = function (id) {
    var form = this;
    $http.put(uri+'/player/'+id, form.data).success(function (data) {
      form.data = null;
      $http.get(uri+'/player/').success(function (data) {
        $scope.players = api('players', data);
      });
    });
  }
  $scope.removePlayer = function (id) {
    $http.delete(uri+'/player/'+id).success(function (data) {
      $http.get(uri+'/player/').success(function (data) {
        $scope.players = api('players', data);
      });
    });
  }

}]);

// Controller: Faction
app.controller('MatchController', ['$scope', '$http', '$routeParams', 'api', function ($scope, $http, $routeParams, api) {

  $scope.factions = api('factions');
  $scope.players = api('players');
  $scope.matches = api('matches');

  // Single match, get data
  if ($routeParams.id) {
    $http.get(uri+'/match/'+$routeParams.id).success(function (data) {
      $scope.match = data;
    });
  }

  $scope.addMatchResult = function () {
    var form = this;
    console.log(form.data)
    $http.post(uri+'/match/', form.data).success(function (data) {
      form.data = null;
      $http.get(uri+'/match/').success(function (data) {
        $scope.matches = api('matches', data);
      });
    });
  }
  $scope.editMatchResult = function (id) {
    var form = this;
    $http.put(uri+'/match/'+id, form.data).success(function (data) {
      form.data = null;
      $http.get(uri+'/match/').success(function (data) {
        $scope.matches = api('matches', data);
      });
    });
  }
  $scope.removeMatchResult = function (id) {
    $http.delete(uri+'/match/'+id).success(function (data) {
      $http.get(uri+'/match/').success(function (data) {
        $scope.matches = api('matches', data);
      });
    });
  }

}]);
