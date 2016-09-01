'use strict';

angular
  .module('app', [
    'ngAnimate',
    'ui.router',
    'ui.bootstrap',
    'mgcrea.ngStrap',
    'angular-medium-editor',
    'treeControl',
    'common.http',
    'app.login',
    'app.frame',
    'app.judgment',
    'app.dashboard',
    'app.repository'
  ])
  .config([
    '$stateProvider', '$urlRouterProvider', '$httpProvider',
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
        .state('frame', {
          url: '/frame',
          templateUrl: 'partials/frame/view.html',
          controller: 'frameController',
          controllerAs: 'frame'
        });
      /** HTTP Interceptor */
      $httpProvider.interceptors.push(['$q',
        function($q) {
          return {
            'request': function(config) {
              config.withCredentials = true;
              var token = sessionStorage.token;
              if( token ) {
                config.headers = _.assign({}, {'Authorization': 'Bearer ' + token}, config.headers)
              };
              return config;
            },
            'requestError': function(rejection) {
              return rejection;
            },
            'response': function(response) {
              $q.when(response, function(result){
                if( response.data && typeof response.data==='object'){
                  if(result.data.head.status===300){
                    sessionStorage.message = '登录超时，请重新登录！';
                    $location.href = '/login';
                  };
                };
              });
              return response;
            },
            'responseError': function(rejection) {
              return rejection;
            }
          };
        }
      ]);
    }
  ])
  .run([
    function() {
    }
  ]);
