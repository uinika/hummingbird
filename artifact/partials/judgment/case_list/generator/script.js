(function(){
  var module = angular.module('app.judgment');

  module.controller('JudgmentGeneratorController', [
    '$scope', 'treeData', 'judgmentGeneratorService',
    function($scope, treeData, judgmentGeneratorFactory) {
      var vm = this;
      $scope.treeOptions = {
          nodeChildren: "children",
          dirSelectable: true,
          injectClasses: {
            ul: "a1",
            li: "a2",
            liSelected: "a7",
            iExpanded: "a3",
            iCollapsed: "a4",
            iLeaf: "a5",
            label: "a6",
            labelSelected: "a8"
          }
      }
      if(treeData) {
        $scope.dataForTheTree = treeData;
      }

    }
  ]);

  module.factory('judgmentGeneratorService', [
    '$http',
    function($http) {
      return {
        getJudgmentContent: getJudgmentContent
      }
      //Get Judgment Content
      function getJudgmentContent() {
        return $http.get(
          URL + '/legal/verdict'
        )
      }
    }
  ]);


})();
