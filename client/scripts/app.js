// Entry module
angular
  .module('app', [
    'ui.router',
    'ui.bootstrap',
    'ngAnimate',
    'app.login'
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
      templateUrl: 'views/login/main.html',
      controller: 'loginController',
      controllerAs: 'login',
    })
    .state('frame', {
      url: '/frame',
      templateUrl: 'views/frame/main.html',
      controller: 'FrameController'
    })
    // Dashboard
    .state('frame.dashboard', {
      url: '/dashboard',
      templateUrl: 'views/dashboard/main.html',
      controller: 'DashboardController'
    });
}
