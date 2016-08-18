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
    'app.judgment',
    'app.judgment.create',
    'app.repository.laws',
    'app.repository.laws.structure',
    'app.repository.summary',
    'app.repository.summary.structure',
    'app.repository.summary.explain',
    'app.repository.summary.rule',
    'app.repository.judgementLib',
    'app.repository.judgementLib.search'
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
        .state('frame.judgmentCreate', {
          url: '/judgmentCreate',
          templateUrl: 'partials/judgment/create/view.html',
          controller: 'judgmentCreateController',
          controllerAs: 'judgmentCreate'
        })
        .state('frame.repository', {
          url: '/repository',
          templateUrl: 'partials/repository/view.html',
          controller: 'repositoryController',
          controllerAs: 'repository'
        })
        .state('frame.repositorySearch', {
          url: '/repositorySearch',
          templateUrl: 'partials/repository/search/view.html',
          controller: 'repositorySearchController',
          controllerAs: 'repositorySearch'
        })
        .state('frame.repositoryLaws', {
          url: '/repositoryLaws',
          templateUrl: 'partials/repository/laws/view.html',
          controller: 'lawsController',
          controllerAs: 'laws'
        })
        .state('frame.lawsStructure', {
          url: '/lawsStructure',
          templateUrl: 'partials/repository/laws/structure/view.html',
          controller: 'lawsStructureController',
          controllerAs: 'lawsStructure'
        })
        .state('frame.repositorySummary', {
          url: '/repositorySummary',
          templateUrl: 'partials/repository/summary/view.html',
          controller: 'summaryController',
          controllerAs: 'summary'
        })
        .state('frame.summaryStructure', {
          url: '/summaryStructure',
          templateUrl: 'partials/repository/summary/structure/view.html',
          controller: 'summaryStructureController',
          controllerAs: 'summaryStructure'
        })
        .state('frame.summaryExplain', {
          url: '/summaryExplain',
          templateUrl: 'partials/repository/summary/explain/view.html',
          controller: 'summaryExplainController',
          controllerAs: 'summaryExplain'
        })
        .state('frame.summaryRule', {
          url: '/summaryRule',
          templateUrl: 'partials/repository/summary/rule/view.html',
          controller: 'summaryRuleController',
          controllerAs: 'summaryRule'
        })
        .state('frame.judgementLib', {
          url: '/judgementLib',
          templateUrl: 'partials/repository/judgementLib/view.html',
          controller: 'judgementLibController',
          controllerAs: 'judgementLib'
        })
        .state('frame.judgementLibSearch', {
          url: '/judgementLibSearch',
          templateUrl: 'partials/repository/judgementLib/search/view.html',
          controller: 'judgementLibSearchController',
          controllerAs: 'judgementLibSearch'
        });
    }
  ])
  .run([
    'editableOptions',
    function(editableOptions) {
      editableOptions.theme = 'bs3';
    }
  ]);
