(function(){
  /** Module */
  var module = angular.module('app.judgment');

  /** Controller */
  module.controller('CaseListController', [
    '$scope', 'caseListService',
    function($scope, caseListService) {
      var vm = this;
      vm.open = caseListService.openCreateModal;
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
      function openCreateModal () {
        $uibModal.open({
          animation: true,
          size: 'lg',
          controller: 'MyModalController',
          templateUrl: 'partials/judgment/case_list/generator/view.html',
          windowTopClass: 'wiserv-ui'
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
