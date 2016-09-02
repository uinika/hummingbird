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
        judgmentGeneratorService.saveJudgmentTemplate({
          articleContentJson: JSON.stringify(vm.article),
          articleContent: $('.editor>.center').text().trim(),
          articleHtml: $('.editor>.center').html().trim(),
          articleId: "",
          templateId: "",
          causeOfAction: "",
          lawCaseName: ""
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
          lawCaseName: "test",
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
          URL + '/verdict/export/word', data, {
            headers: {
              "Content-Type": "application/msword;charset=UTF-8",
              "Content-Disposition": "attachment",
              'responseType': 'arraybuffer'
            }
          }
        )
        .then(function(result) {
          var blob = new Blob([result.data], {type: 'application/msword;charset=UTF-8'});
          $window.open (window.URL.createObjectURL(blob));
        })
      };
    }
  ]);


})();
