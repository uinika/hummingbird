(function(){

  angular.module('app.judgment').controller('EditorController', EditorController);

  EditorController.$inject = ['editorConstant', 'editorService', '$location', '$anchorScroll', '$uibModal'];

  function EditorController(editorConstant, editorService, $location, $anchorScroll, $uibModal) {
    var vm = this;
    /* Constant */
    vm.calculator = 'calculator.html';
    vm.treeData = editorConstant.TreeData;
    vm.treeSectionOptions = editorConstant.TreeOptions;
    vm.treeTemplateOptions = editorConstant.ReasonTreeOptions;
    vm.mediumEditorOptions = editorConstant.mediumEditorOptions;
    /* Variable */
    vm.judgment = {};
    vm.template = {};
    vm.lawItems = [];
    //
    vm.similarCase = {};
    vm.similarCase.list = [];
    vm.similarCase.selected = {};
    vm.similarCase.select = selectSimilarCase;
    //
    vm.operation = operation();
    //
    vm.templateTree = templateTree();
    vm.templateTree.accordThinkInfo  = '';
    vm.templateTree.verdictThinkInfo = '';

    !function init() {
      // Loding judgment from session storage
      var judgment = sessionStorage.targetJudgment;
      if (judgment) {
        vm.judgment = JSON.parse(judgment);
        // Template content
        editorService.getJudgmentTemplate(vm.judgment)
        .then(function(data) {
           vm.template = data.body[0];
           // Init judgment match
           editorService.matchTemplateTree()
           .then(function(data){
             vm.reasonTree = data.body;
           });
           // Init similar case
           editorService.fetchSimilarCase(
               vm.template.templateArticle.parties.caseGeneral
             + vm.template.templateArticle.fact.claims
             + vm.template.templateArticle.fact.argued
             + vm.template.templateArticle.fact.factResult
           ).then(function(data){
             if(data && data.body){
               vm.similarCase.list = data.body;
             }
           });
        });
        // Init low item
        editorService.fetchLawItem({
          causeOfAction: vm.judgment.causeOfAction
        })
        .then(function(data) {
           vm.lawItems = data.body;
        });
      };
    }();

    function selectSimilarCase(similarCase) {
      vm.similarCase.selected = similarCase;
    };

    function templateTree() {
      return {
        match: function (treeId) {
          editorService.matchTemplateTreeInfo({treeId: treeId })
          .then(function(data) {
            var body = data.body[0];
            if(body.accordThinkInfo && body.verdictThinkInfo) {
               vm.templateTree.accordThinkInfo  = body.accordThinkInfo;
               vm.verdictThinkInfo = body.verdictThinkInfo;
            }
            else {
              vm.templateTree.accordThinkInfo  = '';
              vm.verdictThinkInfo = '';
            }
          })
        },
        transfer: function (info) {
          vm.template.templateArticle.reason = info;
        },
        update: function (info) {
          editorService.updateTemplateTreeInfo({
            autoId: 1,
            treeId: 1,
            conditionName: '',
            accordThinkInfo: '',
            verdictThinkInfo: ''
          })
        }
      }
    };

    function operation() {
      return {
        // Save Judgment
        saveJudgment: function () {
          editorService.saveJudgmentTemplate({
            articleContentJson: JSON.stringify(vm.template.templateArticle),
            articleContent: $('.editor>.center').text().trim(),
            articleHtml: $('.editor>.center').html().trim(),
            articleId: vm.judgment.articleId,
            templateId: vm.targetTemplate.templateId,
            causeOfAction: vm.judgment.causeOfAction,
            lawCaseName: vm.judgment.lawCaseName
          })
          .then(function(data) {
            if(data && data.head) {
              alert(data.head.message);
            }
          })
        },
        // Jump to section by anchor
        jumpToSection: function (id) {
          $location.hash(id);
          $anchorScroll.yOffset = 58;
          $anchorScroll();
        },
        // Export MS word
        exportWORD: function () {
          editorService.exportWORD({
            articleId: vm.judgment.articleId,
            lawCaseName: vm.judgment.lawCaseName,
            articleHtml: $('.editor>.center').html().trim()
          })
        }
      }
    };

  };
})();
