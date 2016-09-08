(function(){

  angular.module('app.judgment').controller('EditorController', EditorController);

  EditorController.$inject = ['$scope', 'TreeData', 'TreeOptions', 'editorService', '$location', '$anchorScroll'];

  function EditorController($scope, TreeData, TreeOptions, editorService, $location, $anchorScroll) {
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
    vm.targetJudgment = JSON.parse(sessionStorage.targetJudgment);
    if ( vm.targetJudgment ) {
      editorService.getJudgmentTemplate(vm.targetJudgment)
      .then(function(data) {
         var target = data.body[0];
         vm.targetTemplate = target;
         vm.article = target.templateArticle;
      });
      editorService.fetchLawItem({
        causeOfAction: vm.targetJudgment.causeOfAction
      })
      .then(function(data) {
         vm.lawItems = data.body;
      });
      editorService.fetchSimilarCase({
        articleContent: vm.targetJudgment.articleContent
      })
      .then(function(data){
        vm.similarCases = data.body;
      });
    };
    // Match Judgment
    vm.match = function(target, part) {
      editorService.matchJudgment(target, part)
      .then(function(data){
        vm.proposals = data.body;
      })
    };
    // Save Judgment
    vm.save = function() {
      editorService.saveJudgmentTemplate({
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
      editorService.exportJudgmentDoc({
        articleId: vm.targetJudgment.articleId,
        lawCaseName: vm.targetJudgment.lawCaseName,
        articleHtml: $('.editor>.center').html().trim()
      })
      .then(function(data){
        // console.log(data);
      })
    }
  };

})();
