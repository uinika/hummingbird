(function() {

    angular
        .module('app.repository', [
          'app.repository.search',
          'app.repository.laws',
          'app.repository.laws.structure',
          'app.repository.summary',
          'app.repository.summary.structure',
          'app.repository.summary.explain',
          'app.repository.summary.rule',
          'app.repository.judgementLib',
          'app.repository.judgementLib.search'
        ])
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('repository', {
          parent: 'frame',
          abstract: true,
          url: '/repository',
          template: '<ui-view/>'
        })
        .state('judgment.case_list', {
          parent: 'judgment',
          url: '/case_list',
          templateUrl: 'partials/judgment/case_list/view.html',
          controller: 'judgmentController',
          controllerAs: 'judgment',
        })
        .state('judgment.doc_list', {
          parent: 'judgment',
          url: '/doc_list',
          templateUrl: 'partials/judgment/doc_list/view.html',
          controller: 'judgmentController',
          controllerAs: 'judgment',
        });
    }

})();
