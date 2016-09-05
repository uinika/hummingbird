(function(){
  /** Module */
  var module = angular.module('app.judgment');

  /** Controller */
  module.controller('CaseListController', [
    '$scope', 'caseListService',
    function($scope, caseListService) {
      var vm = this;
      vm.openModule = function(item){
        vm.targetJudgment = item;
        caseListService.openGeneratorModal($scope)
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
        openGeneratorModal: openGeneratorModal,
        getCaseList: getCaseList
      }
      // Create Modal
      function openGeneratorModal ($scope) {
        $uibModal.open({
          animation: true,
          controller: 'JudgmentGeneratorController',
          controllerAs: 'Generator',
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
