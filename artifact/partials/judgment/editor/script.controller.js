(function(){

  angular.module('app.judgment').controller('EditorController', EditorController);

  EditorController.$inject = ['editorConstant', 'editorService', '$location', '$anchorScroll', '$uibModal'];

  function EditorController(editorConstant, editorService, $location, $anchorScroll, $uibModal) {
    var vm = this;
    /* Constant */
    vm.treeData = editorConstant.TreeData;
    vm.treeOptions = editorConstant.TreeOptions;
    vm.reasonTreeOptions = editorConstant.ReasonTreeOptions;
    vm.mediumEditorOptions = editorConstant.mediumEditorOptions;
    vm.openStatus = editorConstant.openStatus;
    /* Variable */
    vm.targetJudgment = {};
    vm.template = {};
    vm.lawItems = [];
    vm.similarCases = [];
    vm.selectedSimilarCase = {};
    vm.selectedReason = '';
    vm.accordThinkInfo  = '';
    vm.verdictThinkInfo = '';
    /* Event */
    vm.selectSimilarCase = selectSimilarCase;
    vm.saveJudgment = saveJudgment;
    vm.jumpToSection = jumpToSection;
    vm.exportWORD = exportWORD;
    vm.matchTemplateTreeInfo = matchTemplateTreeInfo;
    vm.transferTemplateTreeInfo = transferTemplateTreeInfo;
    vm.updateTemplateTreeInfo = updateTemplateTreeInfo;
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
           editorService.matchTemplateTree()
           .then(function(data){
             vm.reasonTree = data.body;
           });
           // Init similar case
           editorService.fetchSimilarCase(
             baseArticle
             + vm.template.templateArticle.fact.factResult
           ).then(function(data){
             if(data && data.body){
               vm.similarCases = data.body;
             }
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
    /* Select similar case */
    function selectSimilarCase(similarCase) {
      vm.selectedSimilarCase = similarCase;
    };
    /* Template Tree & Transfer */
    function matchTemplateTreeInfo(treeId) {
      editorService.matchTemplateTreeInfo({treeId: treeId })
      .then(function(data) {
        if(data
           && data.body
           && data.body[0]
           && data.body[0].accordThinkInfo
           && data.body[0].verdictThinkInfo) {
           vm.accordThinkInfo  = data.body[0].accordThinkInfo;
           vm.verdictThinkInfo = data.body[0].verdictThinkInfo;
        }
        else {
          vm.accordThinkInfo  = '';
          vm.verdictThinkInfo = '';
        }
      })
    };
    function transferTemplateTreeInfo(info) {
      vm.template.templateArticle.reason = info;
    };
    function updateTemplateTreeInfo(info) {
      editorService.updateTemplateTreeInfo({
        autoId: 1,
        treeId: 1,
        conditionName: '',
        accordThinkInfo: '',
        verdictThinkInfo: ''
      })
    }
    /* Save Judgment */
    function saveJudgment() {
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
      $anchorScroll.yOffset = 58;
      $anchorScroll();
    }
    /* Export MS word */
    function exportWORD() {
      editorService.exportWORD({
        articleId: vm.targetJudgment.articleId,
        lawCaseName: vm.targetJudgment.lawCaseName,
        articleHtml: $('.editor>.center').html().trim()
      })
    };
  };
})();
