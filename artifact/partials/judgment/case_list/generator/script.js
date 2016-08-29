(function(){
  var module = angular.module('app.judgment');

  module.controller('JudgmentGeneratorController', [
    '$scope', 'treeData', 'judgmentGeneratorService',
    function($scope, treeData, judgmentGeneratorService) {
      var vm = this;
      var parentTargetJudgment = $scope.CaseList.targetJudgment;
      if ( parentTargetJudgment ) {
        judgmentGeneratorService.getJudgmentTemplate(parentTargetJudgment)
        .then(function(data) {
          console.log(data.body);
           var target = data.body[0];
           if(target){
             vm.article = target.templateArticle;
           }
        })
      };

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
    '$http', 'URL', 'validate',
    function($http, URL, validate) {
      return {
        getJudgmentTemplate: getJudgmentTemplate
      }
      //Get Judgment Content
      function getJudgmentTemplate(params) {
        return $http.get(
          URL + '/verdict/template', { params: params }
        )
        .then(function(result) {
          if(validate(result.data, 200)){
            return result.data;
          }
        })
      }
    }
  ]);


})();
