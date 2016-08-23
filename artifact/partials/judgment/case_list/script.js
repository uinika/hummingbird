(function(){
  /** Module */
  var judgment = angular.module('app.judgment');

  /** Controller */
  judgment.controller('judgmentController', [
    '$scope', 'judgmentService',
    function($scope, judgmentService) {
      var vm = this;
      vm.open = judgmentService.openCreateModal;

    }
  ]);

  /** Service */
  judgment.factory('judgmentService', [
    '$uibModal',
    function($uibModal) {
      return {
        openCreateModal: openCreateModal
      }
      // Create Modal
      function openCreateModal () {
        $uibModal.open({
          animation: true,
          template: '<div/>',
          size: 'lg',
          windowTemplateUrl: 'partials/judgment/case_list/modal/view.html',
        })
      }

    }
  ]);

})();
