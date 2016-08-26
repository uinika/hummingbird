(function(){
  /** Module */
  var module = angular.module('app.judgment');

  /** Controller */
  module.controller('CaseListController', [
    '$scope', 'caseListService',
    function($scope, caseListService) {
      var vm = this;
      vm.open = function(articleId, category){
        vm.targetJudgment = {
          articleId: articleId,
          category: category
        };
        caseListService.openCreateModal($scope)
      };
      caseListService.getCaseList()
      .then(function(result){
        vm.list = result.data.body
      })
    }
  ]);

  /** Service */
  module.factory('caseListService', [
    '$uibModal', '$http', 'URL',
    function($uibModal, $http, URL) {
      return {
        openCreateModal: openCreateModal,
        getCaseList: getCaseList
      }
      // Create Modal
      function openCreateModal ($scope) {
        $uibModal.open({
          animation: true,
          size: 'lg',
          controller: 'JudgmentGeneratorController',
          controllerAs: 'JudgmentGenerator',
          templateUrl: 'partials/judgment/case_list/generator/view.html',
          windowTopClass: 'wiserv-ui',
          scope: $scope
        })
      }
      // Get CaseList
      function getCaseList () {
        return $http.get(
          URL + '/legal/verdict'
        )
      }

    }
  ]);

})();
