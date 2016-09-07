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
      vm.targetJudgment = $scope.CaseList.targetJudgment;
      if ( vm.targetJudgment ) {
        judgmentGeneratorService.getJudgmentTemplate(vm.targetJudgment)
        .then(function(data) {
           var target = data.body[0];
           vm.targetTemplate = target;
           vm.article = target.templateArticle;
        })
      };
      // Match Judgment
      vm.match = function(target, part) {
        judgmentGeneratorService.matchJudgment(target, part)
        .then(function(data){
          vm.proposals = data.body;
          console.log(data.body);
        })
      }
      // Save Judgment
      vm.save = function() {
        judgmentGeneratorService.saveJudgmentTemplate({
          articleContentJson: JSON.stringify(vm.article),
          articleContent: $('.editor>.center').text().trim(),
          articleHtml: $('.editor>.center').html().trim(),
          articleId: vm.targetJudgment.articleId,
          templateId: vm.targetTemplate.templateId,
          causeOfAction: vm.targetJudgment.causeOfAction,
          lawCaseName: vm.targetJudgment.lawCaseName
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
          articleId: vm.targetJudgment.articleId,
          lawCaseName: vm.targetJudgment.lawCaseName,
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
        exportJudgmentDoc: exportJudgmentDoc,
        matchJudgment: matchJudgment
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
      // Match all Judgment
      function matchJudgment(target, part) {
        switch(part) {
          case 'factResult':
          return $http.post(
            URL + '/verdict/fact/result', { articleContent: target }
          ).then(function(result){
            if(validate(result.data, 200)){
              return result.data;
            }
          });
          break;
          case 'reason':
          return $http.post(
            URL + '/verdict/reason', { articleContent: target }
          ).then(function(result){
            if(validate(result.data, 200)){
              return result.data;
            }
          });
          break;
          case 'caseMain':
          return $http.post(
            URL + '/verdict/case/main', { articleContent: target }
          ).then(function(result){
            if(validate(result.data, 200)){
              return result.data;
            }
          });
          break;
        }
      };
    }
  ]);


})();
