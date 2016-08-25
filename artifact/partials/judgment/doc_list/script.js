(function(){
  /** Module */
  var module = angular.module('app.judgment');

  /** Controller */
  module.controller('DocListController', [
    '$scope', 'docListService',
    function($scope, docListService) {
      var vm = this;

    }
  ]);

  /** Service */
  module.factory('docListService', [
    '$uibModal',
    function($uibModal) {
      return {

      }
    }
  ]);

})();
