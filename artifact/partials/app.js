'use strict';

(function() {

  angular.module('app', [
    'ngAnimate',
    'ui.router',
    'ngMaterial',
    'mdSteppers',
    'ui.bootstrap',
    'angular-medium-editor',
    'treeControl',
    'common.http',
    'app.login',
    'app.layout',
    'app.judgment',
    'app.dashboard',
    'app.repository'
  ])
  .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

  function config($stateProvider, $urlRouterProvider, $httpProvider) {
    /** UI-Router Config */
    $urlRouterProvider.otherwise('/login');
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'partials/login/view.html',
        controller: 'loginController',
        controllerAs: 'login'
      })
      .state('layout', {
        url: '/layout',
        templateUrl: 'partials/layout/view.html',
        controller: 'layoutController',
        controllerAs: 'layout'
      })
      .state('demo', {
        url: '/demo',
        templateUrl: 'partials/demo/flash.htm'
      });
    /** HTTP Interceptor */
    $httpProvider.interceptors.push(interceptor);
    interceptor.$inject = ['$q', '$location'];
    function interceptor($q, $location) {
      return {
        'request': function(config) {
          config.withCredentials = true;
          var token = sessionStorage.token;
          if( token ) {
            config.headers = _.assign({}, {'Authorization': 'Bearer ' + token}, config.headers)
          };
          return config;
        },
        'response': function(response) {
          $q.when(response, function(result){
            if( response.data && response.data.head && typeof response.data==='object'){
              if(result.data.head.status===202){
                sessionStorage.message = '登录超时，请重新登录！';
                $location.url('/');
              };
            };
          });
          return response;
        }
      };
    };

  };

})();
