(function(){
  var module = angular.module('app.judgment');

  module.controller('JudgmentGeneratorController', [
    '$scope', 'TreeData', 'TreeOptions', 'judgmentGeneratorService', '$location', '$anchorScroll', '$alert',
    function($scope, TreeData, TreeOptions, judgmentGeneratorService, $location, $anchorScroll, $alert) {
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
      var targetTemplate;
      if ( parentTargetJudgment ) {
        judgmentGeneratorService.getJudgmentTemplate(parentTargetJudgment)
        .then(function(data) {
           var target = data.body[0];
           targetTemplate = target;
           if(target){
             vm.article = targetTemplate.templateArticle;
           }
        })
      };
      // Save Judgment
      vm.save = function() {
        judgmentGeneratorService.saveJudgmentTemplate({
          articleContentJson: JSON.stringify(vm.article),
          articleContent: $('.editor>.center').text().trim(),
          articleHtml: $('.editor>.center').html().trim(),
          articleId: parentTargetJudgment.articleId,
          templateId: targetTemplate.templateId,
          causeOfAction: parentTargetJudgment.causeOfAction,
          lawCaseName: parentTargetJudgment.lawCaseName
        })
        .then(function(data) {
          if(data && data.head) {
            alert(data.head.message);
          }
        })
      };
      // Goto target article id
      vm.goto = function(id) {
        $location.hash(id);
        $anchorScroll();
      }
      // Export document
      vm.export = function() {
        judgmentGeneratorService.exportJudgmentDoc({
          articleId: parentTargetJudgment.articleId,
          lawCaseName: parentTargetJudgment.lawCaseName,
          articleHtml: $('.editor>.center').html().trim()
        })
        .then(function(data){
          // console.log(data);
        })
      }
    }
  ]);

  module.factory('judgmentGeneratorService', [
    '$http', 'URL', 'validate', '$window',
    function($http, URL, validate, $window) {
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
          URL + '/verdict/writ', data
        )
        .then(function(result) {
          if(validate(result.data, 200)){
            return result.data;
          }
        })
      };
      // Export Judgment Document
      function exportJudgmentDoc(data) {
        return $http.post(
          URL + '/verdict/export/word', data
        )
        .then(function(result) {
          if(validate(result.data, 200)){
            console.log(result.data.body[0].downloadUrl);
            $window.open(URL + '/' + result.data.body[0].downloadUrl);
          }
        })
      };
    }
  ]);


})();
