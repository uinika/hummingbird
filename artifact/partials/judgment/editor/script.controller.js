(function(){

  angular.module('app.judgment').controller('EditorController', EditorController);

  EditorController.$inject = ['editorConstant', 'editorService', '$location', '$anchorScroll'];

  function EditorController(editorConstant, editorService, $location, $anchorScroll) {
    var vm = this;
    /* Constant */
    vm.treeOptions = editorConstant.TreeOptions;
    vm.treeData = editorConstant.TreeData;
    vm.mediumEditorOptions = editorConstant.mediumEditorOptions;
    vm.openStatus = editorConstant.openStatus;
    /* Variable */
    vm.targetJudgment = {};
    vm.template = {};
    vm.lawItems = [];
    vm.similarCases = [];
    vm.proposalsFactResult = [];
    vm.proposalsReason = [];
    vm.proposalsCaseMain = [];
    /* Event */
    vm.matchFactResult = matchFactResult;
    vm.matchCaseMain = matchCaseMain;
    vm.matchReason = matchReason;
    vm.transferFactResult = transferFactResult;
    vm.save = save;
    vm.jumpToSection = jumpToSection;
    vm.exportWORD = exportWORD;
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
           var baseArticle = vm.template.templateArticle.parties.caseGeneral
             + vm.template.templateArticle.fact.claims
             + vm.template.templateArticle.fact.argued
           // Init judgment match
           editorService.matchByFactResult(
             baseArticle
             + vm.template.templateArticle.fact.factResult
           ).then(function(data){
             vm.proposalsFactResult = data.body;
           });
           editorService.matchByReason(
             baseArticle
             + vm.template.templateArticle.fact.factResult
             + vm.template.templateArticle.reason
           ).then(function(data){
             vm.proposalsReason = data.body;
           });
           editorService.matchByCaseMain(
             baseArticle
             + vm.template.templateArticle.fact.factResult
             + vm.template.templateArticle.reason
             + vm.template.templateArticle.caseMain
           ).then(function(data){
             vm.proposalsCaseMain = data.body;
           });
           // Init similar case
           editorService.fetchSimilarCase(
             baseArticle
             + vm.template.templateArticle.fact.factResult
           ).then(function(data){
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
    /* Match by FactResult */
    function matchFactResult (target) {
      editorService.matchByFactResult(target)
      .then(function(data){
        vm.proposalsFactResult = data.body;
      })
    };
    /* Match by Reason */
    function matchReason(target) {
      editorService.matchByReason(target)
      .then(function(data){
        vm.proposalsReason = data.body;
      })
    };
    /* Match by CaseMain */
    function matchCaseMain(target) {
      editorService.matchByCaseMain(target)
      .then(function(data){
        vm.proposalsCaseMain = data.body;
      })
    };
    /* Append factResult to Editor */
    function transferFactResult(target) {
      console.log(target);
      vm.template.templateArticle.fact.factResult = target;
    };
    vm.transferCaseMain =
    /* Append caseMain to Editor */
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
    /* Jump to section by anchor */
    function jumpToSection(id) {
      $location.hash(id);
      $anchorScroll();
    }
    /* Export MS word */
    function exportWORD() {
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
