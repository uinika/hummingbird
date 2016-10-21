(function(){

  angular.module('app.judgment').controller('EditorController', EditorController);

  EditorController.$inject = ['editorConstant', 'editorService', '$window', '$location', '$anchorScroll', '$uibModal', '$state', '$scope', '$mdDialog'];

  function EditorController(editorConstant, editorService, $window, $location, $anchorScroll, $uibModal, $state, $scope, $mdDialog) {
    var vm = this;
    vm.Judgment = {
      historyList: []
    };
    vm.Template = {};
    vm.LawItem = {
      list: []
    };
    vm.Operation = {
      isTabOpen: false,
      suggestions: [],
      saveJudgment: operation().saveJudgment,
      printJudgment: operation().printJudgment,
      jumpToSection: operation().jumpToSection,
      exportWORD: operation().exportWORD,
      openMaterial: operation().openMaterial,
      autoComplete:  operation().autoComplete
    };
    vm.Constant = {
      materials: editorConstant.materials,
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
      tree: [],
      result: [],
      selectedContent: {},
      match: templateTree().match,
      transfer: templateTree().transfer,
      update: templateTree().update,
      dialog: {
        show: templateTree().dialog.show,
        cancel: templateTree().dialog.cancel
      }
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
             vm.TemplateTree.tree = data.body;
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
        // zoomI
        editorService.Judgment.history({
          articleId: vm.Judgment.articleId
        })
        .then(function(data){
          vm.Judgment.historyList = data.body;
        })
      };
    }();

    /**  */
    function similarCase() {
      return {
        choose: function(similarCase) {
          vm.SimilarCase.selected = similarCase;
        }
      }
    };

    /** templateTree event handler */
    function templateTree() {
      return {
        match: function(treeId, rootId) {
          console.log(treeId + "-----" + rootId);
          if(rootId) {
            editorService.TemplateTree.match({treeId: treeId})
            .then(function(data) {
              vm.TemplateTree.result[rootId] = data.body[0].accordThinkInfo || "暂无内容，请继续选择！";
            })
          }
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
          var selectedContent = vm.TemplateTree.selectedContent;
          editorService.TemplateTree.update({
            autoId: selectedContent.autoId,
            treeId: selectedContent.treeId,
            conditionName: selectedContent.conditionName,
            accordThinkInfo: selectedContent.accordThinkInfo,
            verdictThinkInfo: selectedContent.verdictThinkInfo
          })
          .then(function(data) {
            alert(data.head.message)
          })
        },
        dialog: {
          show: function(event) {
            $mdDialog.show({
              templateUrl: 'partials/judgment/editor/view.dialog.html',
              clickOutsideToClose:true,
              fullscreen: true,
              scope: $scope,
              preserveScope: true
            })
            .then(function(result) {

            });
          },
          cancel: function() {
            $mdDialog.cancel();
          }
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
            templateId: vm.Template.templateId,
            causeOfAction: vm.Judgment.causeOfAction,
            lawCaseName: vm.Judgment.lawCaseName
          })
          .then(function(data) {
            alert(data.head.message);
            return data.head.status
          })
          .then(function(status){
            if(status===200){
              $state.go('judgment.doc_list');
            }
          })
        },
        printJudgment: function() {
          $window.document.body.innerHTML = $(".center").html();
          $window.print();
          $window.location.reload();
        },
        jumpToSection: function (id) {
          $('#'+id).focus();
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
        },
        openMaterial: function(material) {
          vm.Operation.targetMaterial = material;
          var modalInstance = $uibModal.open({
            templateUrl: 'materialModal.html',
            scope: $scope
          });
        },
        autoComplete: function() {
          // console.log(window.getSelection().anchorOffset);
          // console.log(vm.Template.templateArticle.caseMain);
          editorService.Operation.autoComplete({
            keyword: vm.Template.templateArticle.caseMain
          })
          .then(function(data) {
            if(data && data.body) {
              console.log(data.body);
              vm.Operation.suggestions = data.body
            }
          })
        }
      }
    };

  };
})();
