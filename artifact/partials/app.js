'use strict';

angular
  .module('app', [
    'ngAnimate',
    'ui.router',
    'ui.bootstrap',
    'data-table',
    'xeditable',
    'app.login',
    'app.frame',
    'app.dashboard',
    'app.repository',
    'app.repository.search',
    'app.judgment'
  ])
  .config([
    '$stateProvider', '$urlRouterProvider',
    function config($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/login');
      $stateProvider
        .state('login', {
          url: '/login',
          templateUrl: 'partials/login/view.html',
          controller: 'loginController',
          controllerAs: 'login'
        })
        .state('frame', {
          url: '/frame',
          templateUrl: 'partials/frame/view.html',
          controller: 'frameController',
          controllerAs: 'frame'
        })
        .state('frame.dashboard', {
          url: '/dashboard',
          templateUrl: 'partials/dashboard/view.html',
          controller: 'dashboardController',
          controllerAs: 'dashboard'
        })
        .state('frame.judgment', {
          url: '/judgment',
          templateUrl: 'partials/judgment/view.html',
          controller: 'judgmentController',
          controllerAs: 'judgment'
        })
        .state('frame.repository', {
          url: '/repository',
          templateUrl: 'partials/repository/view.html',
          controller: 'repositoryController',
          controllerAs: 'repository'
        })
        .state('frame.repository.search', {
          url: '/search',
          templateUrl: 'partials/repository/search/view.html',
          controller: 'repositorySearchController',
          controllerAs: 'repositorySearch'
        });
    }
  ])
  .run([
    'editableOptions',
    function(editableOptions) {
      editableOptions.theme = 'bs3';
    }
  ]);
