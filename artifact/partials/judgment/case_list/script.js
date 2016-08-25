(function(){
  /** Module */
  var module = angular.module('app.judgment');

  /** Controller */
  module.controller('CaseListController', [
    '$scope', 'caseListService',
    function($scope, caseListService) {
      var vm = this;
      vm.open = caseListService.openCreateModal;

    }
  ]);

  /** Service */
  module.factory('caseListService', [
    '$uibModal',
    function($uibModal) {
      return {
        openCreateModal: openCreateModal
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

    }
  ]);

})();
