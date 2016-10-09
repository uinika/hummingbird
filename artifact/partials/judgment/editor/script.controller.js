(function(){

  angular.module('app.judgment').controller('EditorController', EditorController);

  EditorController.$inject = ['editorConstant', 'editorService', '$location', '$anchorScroll', '$uibModal'];

  function EditorController(editorConstant, editorService, $location, $anchorScroll, $uibModal) {
    var vm = this;
    vm.Judgment = {};
    vm.Template = {};
    vm.LawItem = {
      list: []
    };
    vm.Operation = operation();
    vm.Constant = {
      calculator: 'calculator.html',
      treeData: editorConstant.TreeData,
      treeSectionOptions: editorConstant.TreeOptions,
      treeTemplateOptions: editorConstant.ReasonTreeOptions,
      mediumEditorOptions: editorConstant.mediumEditorOptions
    };
    vm.SimilarCase = {
      list: [],
      selected: {},
      choose: similarCase().choose
    };
    vm.TemplateTree ={
      accordThinkInfo: '',
      verdictThinkInfo: '',
      match: templateTree().match,
      transfer: templateTree().transfer,
      update: templateTree().update
    };

    !function init() {
      // Loding judgment from session storage
      var judgment = sessionStorage.targetJudgment;
      if (judgment) {
        vm.Judgment = JSON.parse(judgment);
        // Template content
        editorService.Template.fetch(vm.Judgment)
        .then(function(data) {
           vm.Template = data.body[0];
           // Init judgment match
           editorService.TemplateTree.fetch()
           .then(function(data){
             vm.reasonTree = data.body;
           });
           // Init similar case
           editorService.SimilarCase.fetch(
               vm.Template.templateArticle.parties.caseGeneral
             + vm.Template.templateArticle.fact.claims
             + vm.Template.templateArticle.fact.argued
             + vm.Template.templateArticle.fact.factResult
           ).then(function(data){
             if(data && data.body){
               vm.SimilarCase.list = data.body;
             }
           });
        });
        // Init low item
        editorService.LawItem.fetch({
          causeOfAction: vm.Judgment.causeOfAction
        })
        .then(function(data) {
           vm.LawItem.list = data.body;
        });
      };
    }();

    /**  */
    function similarCase() {
      return {
        choose: function(similarCase) {
          vm.SimilarCase.selected = similarCase;
        }
      }
    }

    /** templateTree event handler */
    function templateTree() {
      return {
        match: function(treeId) {
          editorService.TemplateTree.match({treeId: treeId })
          .then(function(data) {
            var body = data.body[0];
            vm.TemplateTree.accordThinkInfo  = body && body.accordThinkInfo ? body.accordThinkInfo : '';
            vm.TemplateTree.verdictThinkInfo = body && body.verdictThinkInfo ? body.verdictThinkInfo : '';
          })
        },
        transfer: function(templates) {
          if(templates.hasOwnProperty('accordThinkInfo')) {
            vm.Template.templateArticle.reason = templates.accordThinkInfo;
          }
          else if(templates.hasOwnProperty('verdictThinkInfo')){
            vm.Template.templateArticle.caseMain = templates.verdictThinkInfo
          }
        },
        update: function(info) {
          editorService.TemplateTree.update({
            autoId: 1,
            treeId: 1,
            conditionName: '',
            accordThinkInfo: '',
            verdictThinkInfo: ''
          })
          .then(function(data) {
            alert(data);
          })
        }
      }
    };

    /** operation event handler */
    function operation() {
      return {
        saveJudgment: function () {
          editorService.Judgment.save({
            articleContentJson: JSON.stringify(vm.Template.templateArticle),
            articleContent: $('.editor>.center').text().trim(),
            articleHtml: $('.editor>.center').html().trim(),
            articleId: vm.Judgment.articleId,
            templateId: vm.targetTemplate.templateId,
            causeOfAction: vm.Judgment.causeOfAction,
            lawCaseName: vm.Judgment.lawCaseName
          })
          .then(function(data) {
            if(data && data.head) {
              alert(data.head.message);
            }
          })
        },
        jumpToSection: function (id) {
          $location.hash(id);
          $anchorScroll.yOffset = 58;
          $anchorScroll();
        },
        exportWORD: function () {
          editorService.Operation.exportWORD({
            articleId: vm.Judgment.articleId,
            lawCaseName: vm.Judgment.lawCaseName,
            articleHtml: $('.editor>.center').html().trim()
          })
        }
      }
    };

  };
})();
