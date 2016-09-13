(function(){

  angular.module('app.judgment').controller('EditorController', EditorController);

  EditorController.$inject = ['$scope', 'editorConstant', 'editorService', '$location', '$anchorScroll'];

  function EditorController($scope, editorConstant, editorService, $location, $anchorScroll) {
    var vm = this;
    /* Constant */
    vm.treeOptions = editorConstant.TreeOptions;
    vm.treeData = editorConstant.TreeData;
    vm.mediumEditorOptions = editorConstant.mediumEditorOptions;
    vm.openStatus = editorConstant.openStatus;
    /* Value */
    
    /* Event */
    vm.matchFactResult = matchFactResult;
    vm.matchCaseMain = matchCaseMain;
    vm.matchReason = matchReason;
    vm.transferFactResult = transferFactResult;
    vm.save = save;
    vm.goto = goto;
    vm.export = exporter;
    /* Initial */
    activate();
    function activate() {
      var targetJudgment = sessionStorage.targetJudgment;
      if (targetJudgment) {
        vm.targetJudgment = JSON.parse(targetJudgment);
        // Template content
        editorService.getJudgmentTemplate(vm.targetJudgment)
        .then(function(data) {
           vm.template = data.body[0];
           // Init match judgment
           editorService.matchByFactResult((function(){
             var httpParam = vm.template.templateArticle.parties.caseGeneral
               + vm.template.templateArticle.fact.claims
               + vm.template.templateArticle.fact.argued
               + vm.template.templateArticle.fact.factResult
               return httpParam
           })())
           .then(function(data){
             vm.proposalsFactResult = data.body;
           });
           editorService.matchByReason((function(){
             var httpParam = vm.template.templateArticle.parties.caseGeneral
               + vm.template.templateArticle.fact.claims
               + vm.template.templateArticle.fact.argued
               + vm.template.templateArticle.fact.factResult
               + vm.template.templateArticle.reason
               return httpParam
           })())
           .then(function(data){
             vm.proposalsReason = data.body;
           });
           editorService.matchByCaseMain((function(){
             var httpParam = vm.template.templateArticle.parties.caseGeneral
               + vm.template.templateArticle.fact.claims
               + vm.template.templateArticle.fact.argued
               + vm.template.templateArticle.fact.factResult
               + vm.template.templateArticle.reason
               + vm.template.templateArticle.caseMain
               return httpParam
           })())
           .then(function(data){
             vm.proposalsCaseMain = data.body;
           });
           // Init similar case
           editorService.fetchSimilarCase((function(){
             var httpParam = vm.template.templateArticle.parties.caseGeneral
               + vm.template.templateArticle.fact.claims
               + vm.template.templateArticle.fact.argued
               + vm.template.templateArticle.fact.factResult
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
    }
    /*  */
    function matchFactResult (target) {
      editorService.matchByFactResult(target)
      .then(function(data){
        vm.proposalsFactResult = data.body;
      })
    };
    /*  */
    function matchReason(target) {
      editorService.matchByReason(target)
      .then(function(data){
        vm.proposalsReason = data.body;
      })
    };
    /*  */
    function matchCaseMain(target) {
      editorService.matchByCaseMain(target)
      .then(function(data){
        vm.proposalsCaseMain = data.body;
      })
    };
    /*  */
    function transferFactResult(target) {
      console.log(target);
      vm.template.templateArticle.fact.factResult = target;
    };
    vm.transferCaseMain =
    /*  */
    function transferCaseMain(target) {
      console.log(target);
        vm.template.templateArticle.caseMain = target;
    };
    /*  */
    function save() {
      editorService.saveJudgmentTemplate({
        articleContentJson: JSON.stringify(vm.template.templateArticle),
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
    /*  */
    function goto(id) {
      $location.hash(id);
      $anchorScroll();
    }
    /*  */
    function exporter() {
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
