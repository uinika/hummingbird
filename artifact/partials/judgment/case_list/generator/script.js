(function(){
  var module = angular.module('app.judgment');

  module.controller('JudgmentGeneratorController', [
    '$scope', 'TreeData', 'TreeOptions', 'judgmentGeneratorService', '$location', '$anchorScroll',
    function($scope, TreeData, TreeOptions, judgmentGeneratorService, $location, $anchorScroll) {
      var vm = this;
      // Config for Tree
      vm.treeOptions = TreeOptions;
      vm.treeData = TreeData;
      // Config MediumEditor
      vm.mediumEditorOptions = {
        toolbar:false,
        spellcheck: false
      };
      // Initial Template
      var parentTargetJudgment = $scope.CaseList.targetJudgment;
      if ( parentTargetJudgment ) {
        judgmentGeneratorService.getJudgmentTemplate(parentTargetJudgment)
        .then(function(data) {
           var target = data.body[0];
           if(target){
             vm.article = target.templateArticle;
           }
        })
      };
      // Save Judgment
      vm.save = function() {
        console.log($('.editor>.center').html());
        console.log($('.editor>.center').text());
        console.log(vm.article);
      };
      // Goto target article id
      vm.goto = function(id) {
        $location.hash(id);
        $anchorScroll();
      }
      //
      vm.export = function() {
        judgmentGeneratorService.exportJudgmentDoc({
          lawCaseName: "",
          articleHtml: $('.editor>.center').html().trim()
        });
      }
    }
  ]);

  module.factory('judgmentGeneratorService', [
    '$http', 'URL', 'validate',
    function($http, URL, validate) {
      return {
        getJudgmentTemplate: getJudgmentTemplate,
        saveJudgmentTemplate: saveJudgmentTemplate,
        exportJudgmentDoc: exportJudgmentDoc
      }
      // Get Judgment Content
      function getJudgmentTemplate(params) {
        return $http.get(
          URL + '/verdict/template', { params: params }
        )
        .then(function(result) {
          if(validate(result.data, 200)){
            return result.data;
          }
        })
      };
      // Save Judgment Content
      function saveJudgmentTemplate(data) {
        return $http.post(
          URL + '/verdict/template', { data: data }
        )
        .then(function(result) {
          if(validate(result.data, 200)){
            return result.data;
          }
        })
      }
      // Export Judgment Document
      function exportJudgmentDoc(data) {
        return $http.post(
          URL + '/verdict/export/word', { data: data }
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
