(function(){
  angular.module('app.judgment', [])
  .config([
    '$stateProvider', '$urlRouterProvider',
    function config($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('judgment', {
          url: '/judgment',
          templateUrl: 'partials/judgment/view.html',
          url: '/customer',
          parent: 'frame'
          // templateUrl: 'partials/judgment/view.html',
          // controller: 'judgmentController',
          // controllerAs: 'judgment'
        });
    }
  ]);

})();
