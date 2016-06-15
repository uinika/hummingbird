// Entry module
var App = angular.module('App', [
  'ui.router',
  'ngMaterial',
  'md.data.table'
]);
// Entry module config
App.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    /* Ui-router */
    $urlRouterProvider.otherwise('/dashboard');
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'views/dashboard/main.html'
      });
    
  }
]);
