(function() {

    angular
        .module('app.judgment', [])
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('judgment', {
          parent: 'frame',
          abstract: true,
          url: '/judgment',
          template: '<ui-view/>'
        })
        .state('judgment.case_list', {
          parent: 'judgment',
          url: '/case_list',
          templateUrl: 'partials/judgment/case_list/view.html',
          controller: 'judgmentController',
          controllerAs: 'judgment',
        });
    }

})();
