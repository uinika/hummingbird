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
    vm.openStatus = {
      isFactResult: false,
      isReason: false,
      isCaseMain: false
    };
    // Initial Template
    vm.targetJudgment = JSON.parse(sessionStorage.targetJudgment);
    if ( vm.targetJudgment ) {
      // Template content
      editorService.getJudgmentTemplate(vm.targetJudgment)
      .then(function(data) {
         var target = data.body[0];
         vm.targetTemplate = target;
         vm.article = target.templateArticle;
         // Init match judgment
         editorService.matchByFactResult((function(){
           var httpParam = vm.article.parties.caseGeneral
             + vm.article.fact.claims
             + vm.article.fact.argued
             + vm.article.fact.factResult
             return httpParam
         })())
         .then(function(data){
           vm.proposalsFactResult = data.body;
         });
         editorService.matchByReason((function(){
           var httpParam = vm.article.parties.caseGeneral
             + vm.article.fact.claims
             + vm.article.fact.argued
             + vm.article.fact.factResult
             + vm.article.reason
             return httpParam
         })())
         .then(function(data){
           vm.proposalsReason = data.body;
         });
         editorService.matchByCaseMain((function(){
           var httpParam = vm.article.parties.caseGeneral
             + vm.article.fact.claims
             + vm.article.fact.argued
             + vm.article.fact.factResult
             + vm.article.reason
             + vm.article.caseMain
             return httpParam
         })())
         .then(function(data){
           vm.proposalsCaseMain = data.body;
         });
         // Init similar case
         editorService.fetchSimilarCase((function(){
           var httpParam = vm.article.parties.caseGeneral
             + vm.article.fact.claims
             + vm.article.fact.argued
             + vm.article.fact.factResult
           return httpParam
         })())
         .then(function(data){
           console.log(data);
           vm.similarCases = data.body;
         });
      });
      // Init low item
      editorService.fetchLawItem({
        causeOfAction: vm.targetJudgment.causeOfAction
      })
      .then(function(data) {
         vm.lawItems = data.body;
      });

    };
    // Match Judgment
    vm.matchFactResult = function(target) {
      editorService.matchByFactResult(target)
      .then(function(data){
        vm.proposalsFactResult = data.body;
      })
    };
    vm.matchReason = function(target) {
      editorService.matchByReason(target)
      .then(function(data){
        vm.proposalsReason = data.body;
      })
    };
    vm.matchCaseMain = function(target) {
      editorService.matchByCaseMain(target)
      .then(function(data){
        vm.proposalsCaseMain = data.body;
      })
    };
    // Transfer
    vm.transferFactResult = function(target) {
      console.log(target);
      vm.article.fact.factResult = target;
    };
    vm.transferCaseMain = function(target) {
      console.log(target);
        vm.article.caseMain = target;
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
