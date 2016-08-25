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
          controller: 'CaseListController',
          controllerAs: 'CaseList',
        })
        .state('judgment.doc_list', {
          parent: 'judgment',
          url: '/doc_list',
          templateUrl: 'partials/judgment/doc_list/view.html',
          controller: 'DocListController',
          controllerAs: 'DocList',
        });
    }

})();
