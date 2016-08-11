'use strict';
/** Module */
var dashboard = angular.module('app.dashboard', []);

/** Controller */
dashboard.controller('dashboardController', ['$scope', 'dashboardFactory',
  function($scope, dashboardFactory) {
    var dashboard = this;
    dashboard.hank='uinika'
  }
]);

/** Service */
dashboard.factory('dashboardFactory', [
  function() {
    return {
      'hank':'uinika'
    }
  }
]);

'use strict';
/** Module */
var frame = angular.module('app.frame', []);

/** Controller */
frame.controller('frameController', ['$scope', 'frameFactory',
  function($scope, frameFactory) {
    var frame = this;
    $scope.options = {
      scrollbarV: false
    };

    $scope.data = [
      { name: 'Austin', gender: 'Male' },
      { name: 'Marjan', gender: 'Male' }
    ];
  }
]);

/** Service */
frame.factory('frameFactory', [
  function() {
    return {
      'hank':'uinika'
    }
  }
]);

'use strict';
/** Module */
var judgment = angular.module('app.judgment', []);

/** Controller */
judgment.controller('judgmentController', ['$scope', 'judgmentFactory',
  function($scope, judgmentFactory) {
    var login = this;
    login.hank='uinika'
  }
]);

/** Service */
judgment.factory('judgmentFactory', [
  function() {
    return {
      'hank':'uinika'
    }
  }
]);

'use strict';
/** Module */
var login = angular.module('app.login', []);

/** Controller */
login.controller('loginController', ['$scope', 'loginFactory',
  function($scope, loginFactory) {
    var login = this;
    login.hank='uinika'
  }
]);

/** Service */
login.factory('loginFactory', [
  function() {
    return {
      'hank':'uinika'
    }
  }
]);

'use strict';
/** Module */
var repository = angular.module('app.repository', []);

/** Controller */
repository.controller('repositoryController', ['$scope', 'repositoryFactory',
  function($scope, repositoryFactory) {
    var login = this;
    login.hank='uinika'
  }
]);

/** Service */
repository.factory('repositoryFactory', [
  function() {
    return {
      'hank':'uinika'
    }
  }
]);

// Entry module
angular
  .module('app', [
    'ngAnimate',
    'ui.router',
    'ui.bootstrap',
    'data-table',
    'app.login',
    'app.frame',
    'app.dashboard',
    'app.repository'
  ])
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    config
]);
function config($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/login');
  $stateProvider
    .state('login',{
      url: '/login',
      templateUrl: 'partials/login/main.html',
      controller: 'loginController',
      controllerAs: 'login'
    })
    .state('frame', {
      url: '/frame',
      templateUrl: 'partials/frame/main.html',
      controller: 'frameController',
      controllerAs: 'frame'
    })
    .state('frame.dashboard', {
      url: '/dashboard',
      templateUrl: 'partials/dashboard/main.html',
      controller: 'dashboardController',
      controllerAs: 'dashboard'
    })
    .state('frame.judgment', {
      url: '/judgment',
      templateUrl: 'partials/judgment/main.html',
      controller: 'judgmentController',
      controllerAs: 'judgment'
    })
    .state('frame.repository', {
      url: '/repository',
      templateUrl: 'partials/repository/main.html',
      controller: 'repositoryController',
      controllerAs: 'repository'
    });
}
