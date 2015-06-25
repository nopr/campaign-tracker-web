
var app = angular.module('app', ['ngRoute', 'ui.bootstrap']);
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

// Directive: navigation
app.directive('navigation', ['$http',
  function ($http) {
    return {
      scope: '=',
      controller: function ($rootScope, $scope) {
        // State
        $scope.collapsed = true
        // Requests and broadcasts
        $http.get(uri+'/faction').success(function (data) {
          $rootScope.$broadcast('data', { name: 'factions', data: data })
        })
        $http.get(uri+'/player').success(function (data) {
          $rootScope.$broadcast('data', { name: 'players', data: data })
        })
        $http.get(uri+'/match').success(function (data) {
          $rootScope.$broadcast('data', { name: 'matches', data: data })
        })
        // Data population
        $scope.$on('data', function (events, data) {
          $scope[data.name] = data.data;
        })
      },
      templateUrl: 'app/view/navigation.html'
    }
  }
]);

app.directive('sortBy', function () {
  return {
    scope: '=',
    link: function (scope, element, attrs) {
      element.on('click', function (event) {
        scope.$apply(function () {
          scope.sort.reverse = (scope.sort.type === attrs.type) ? !scope.sort.reverse : false;
          scope.sort.type = attrs.type;
        });
      });
    }
  }
});

// Controller: Main
app.controller('MainController', ['$scope', '$http', function ($scope, $http) {

  // Data population
  $scope.$on('data', function (events, data) {
    $scope[data.name] = data.data;
  })

}]);

// Controller: Faction
app.controller('FactionController', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {

  $scope.sort = {
    type: 'name',
    reverse: false
  }

  // Data population
  $scope.$on('data', function (events, data) {
    $scope[data.name] = data.data;
  })

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
        $scope.$emit('data', { name: 'factions', data: data })
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
        $scope.$emit('data', { name: 'factions', data: data })
        form.$setPristine();
      });
    });
  }
  $scope.removeFaction = function (id) {
    $http.delete(uri+'/faction/'+id).success(function (data) {
      $http.get(uri+'/faction/').success(function (data) {
        $scope.$emit('data', { name: 'factions', data: data })
      });
    });
  }

}]);

// Controller: Player
app.controller('PlayerController', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {

  $scope.sort = {
    type: 'name',
    reverse: false
  }

  // Data population
  $scope.$on('data', function (events, data) {
    console.log(data)
    $scope[data.name] = data.data;
  })

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
        $scope.$emit('data', { name: 'players', data: data })
      });
    });
  }
  $scope.editPlayer = function (id) {
    var form = this;
    $http.put(uri+'/player/'+id, form.data).success(function (data) {
      form.data = null;
      $http.get(uri+'/player/').success(function (data) {
        $scope.$emit('data', { name: 'players', data: data })
      });
    });
  }
  $scope.removePlayer = function (id) {
    $http.delete(uri+'/player/'+id).success(function (data) {
      $http.get(uri+'/player/').success(function (data) {
        $scope.$emit('data', { name: 'players', data: data })
      });
    });
  }

}]);

// Controller: Faction
app.controller('MatchController', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {

  $scope.sort = {
    type: '$index',
    reverse: false
  }

  // Data population
  $scope.$on('data', function (events, data) {
    $scope[data.name] = data.data;
  })

  // Single match, get data
  if ($routeParams.id) {
    $http.get(uri+'/match/'+$routeParams.id).success(function (data) {
      $scope.match = data;
    });
  }

  $scope.addMatchResult = function () {
    var form = this;
    $http.post(uri+'/match/', form.data).success(function (data) {
      form.data = null;
      $http.get(uri+'/match/').success(function (data) {
        $scope.$emit('data', { name: 'matches', data: data })
      });
    });
  }
  $scope.editMatchResult = function (id) {
    var form = this;
    $http.put(uri+'/match/'+id, form.data).success(function (data) {
      form.data = null;
      $http.get(uri+'/match/').success(function (data) {
        $scope.$emit('data', { name: 'matches', data: data })
      });
    });
  }
  $scope.removeMatchResult = function (id) {
    $http.delete(uri+'/match/'+id).success(function (data) {
      $http.get(uri+'/match/').success(function (data) {
        $scope.$emit('data', { name: 'matches', data: data })
      });
    });
  }

}]);
