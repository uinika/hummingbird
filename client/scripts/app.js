// Entry module
var App = angular.module('App', [
  'ui.router',
  'Main',
  'Dashboard',
  'Indicator',
  'Statistics'
]);
// Entry module config
App.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    /* Ui-router */
    $urlRouterProvider.otherwise('/main');
    $stateProvider
      .state('main', {
        url: '/main',
        templateUrl: 'views/common/main.html',
        controller: 'Main.Controller.Main'
      })
      // Dashboard
      .state('main.dashboard', {
        url: '/dashboard',
        templateUrl: 'views/dashboard/main.html',
        controller: 'Dashboard.Controller.Main'
      })
      // Indicator
      .state('main.indicator', {
        url: '/indicator',
        templateUrl: 'views/indicator/main.html',
        controller: 'Indicator.Controller.Main'
      })
      // Statistics
      .state('main.statistics', {
        url: '/statistics',
        templateUrl: 'views/statistics/main.html',
        controller: 'Statistics.Controller.Main'
      });

  }
]);
