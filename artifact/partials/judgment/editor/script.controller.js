(function(){

  angular.module('app.judgment').controller('EditorController', EditorController);

  EditorController.$inject = ['editorConstant', 'editorService', '$window', '$location', '$anchorScroll', '$uibModal', '$state', '$scope', '$mdDialog'];

  function EditorController(editorConstant, editorService, $window, $location, $anchorScroll, $uibModal, $state, $scope, $mdDialog) {
    var vm = this;
    vm.Judgment = { historyList: [] };
    vm.Template = {};
    vm.ReasonTree = {
      tree: [],
      selectedContent: {},
      selectedNode: {},
      selectedNodes: [],
      expandedNodes: [],
      match: templateTree().match,
      transfer: templateTree().transfer,
      update: templateTree().update,
      refresh: templateTree().refresh,
      empty: templateTree().empty
    };
    vm.MainCaseTree = {
      tree: []
    };
    vm.Operation = {
      isTabOpen: false,
      suggestions: [],
      saveJudgment: operation().saveJudgment,
      printJudgment: operation().printJudgment,
      jumpToSection: operation().jumpToSection,
      exportWORD: operation().exportWORD,
      autoComplete:  operation().autoComplete
    };
    vm.SimilarCase = {
      list: [],
      selected: {},
      choose: similarCase().choose
    };
    vm.LawItem = {
      list: []
    };
    vm.Constant = {
      materials: editorConstant.materials,
      treeData: editorConstant.TreeData,
      treeSectionOptions: {
        nodeChildren: "children",
        dirSelectable: false
      },
      reasonTreeOptions: {
        nodeChildren: "nodes",
        dirSelectable: false,
        isSelectable: function(node) {
          return node.rootId == 1;
        }
      },
      caseMainTreeOptions: {
        nodeChildren: "nodes",
        dirSelectable: false,

      },
      mediumEditorOptions: editorConstant.mediumEditorOptions
    };

    /** Initial */
    !function init() {
      // Loding judgment from session storage
      var judgment = sessionStorage.targetJudgment;
      if (judgment) {
        vm.Judgment = JSON.parse(judgment);
        // Template content
        editorService.Template.fetch(vm.Judgment)
        .then(function(data) {
           vm.Template = data.body[0];
           // Init reason tree
           editorService.ReasonTree.fetch()
           .then(function(data){
             vm.ReasonTree.tree = data.body;
           });
           // Init main case tree
           editorService.MainCaseTree.fetch()
           .then(function(data){
             vm.MainCaseTree.tree = data.body;
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
          if(data.body) {
            vm.LawItem.list = data.body;
          }
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

    /** similar case */
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
        match: function(node) {
          var jump = node.jump;
          var end = node.end;
          var next = node.next;
          var currentNodetreeId = node.treeId;
          var currentNoderootId = node.rootId;
          console.log("jump：" + jump + " | next：" + next + " | end：" + end);
          if(next) {
            vm.ReasonTree.selectedNodes.push(currentNoderootId);
            editorService.ReasonTree.match({treeId: node.treeId})
            .then(function(data) {
              vm.ReasonTree.selectedContent.accordThinkInfo = data.body[0].accordThinkInfo || "";
            })
            .then(function() {
              var nextNode = _.find(vm.ReasonTree.tree, {'treeId': next});
              var currentNode = _.find(vm.ReasonTree.tree, {'treeId': currentNoderootId});
              vm.ReasonTree.selectedNode = nextNode;
              vm.ReasonTree.expandedNodes = [nextNode];
              vm.Constant.reasonTreeOptions.isSelectable = function(node) {
                return node.rootId === nextNode.treeId || _.indexOf(vm.ReasonTree.selectedNodes, node.rootId) !== -1;
              }
            })
          }else if(jump) {
            vm.ReasonTree.selectedNodes.push(currentNoderootId);
            var jumpToNode = _.find(vm.ReasonTree.tree, {'treeId': jump});
            vm.ReasonTree.selectedNode = jumpToNode;
            vm.ReasonTree.expandedNodes = [jumpToNode];
            vm.Constant.reasonTreeOptions.isSelectable = function(node) {
              return node.rootId === jumpToNode.treeId || _.indexOf(vm.ReasonTree.selectedNodes, node.rootId) !== -1;
            };
          }else if(end) {
            vm.ReasonTree.selectedNodes.push(currentNoderootId);
            editorService.ReasonTree.match({treeId: node.treeId})
            .then(function(data) {
              if(data && data.body && data.body[0] && data.body[0].accordThinkInfo ) {
                vm.ReasonTree.selectedContent.accordThinkInfo = data.body[0].accordThinkInfo || "";
              }
            })
            .then(function() {
              vm.ReasonTree.expandedNodes = [];
            })
            .then(function() {
              vm.Constant.reasonTreeOptions.isSelectable = function(node) {
                return node.rootId === 0;
              }
            })
            .then(function() {
              alert("流程结束!");
            });
          }else {
            console.info("jump：" + jump + " | next：" + next + " | end：" + end);
            console.warn("ReasonTree -> match -> no handler");
          }
          console.log(vm.ReasonTree.selectedNodes);
        },
        transfer: function(templates) {
          if(templates.hasOwnProperty('accordThinkInfo')) {
            vm.Template.templateArticle.reason += templates.accordThinkInfo;
          }
        },
        update: function(info) {
          var selectedContent = vm.ReasonTree.selectedContent;
          editorService.ReasonTree.update({
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
        refresh: function() {
          vm.ReasonTree.selectedNodes = [];
          var targetNode = _.find(vm.ReasonTree.tree, {'treeId': 1});
          vm.ReasonTree.selectedNode = targetNode;
          vm.ReasonTree.expandedNodes = [targetNode];
          vm.Constant.reasonTreeOptions.isSelectable = function(node) {
            return node.rootId === 1;
          }
        },
        empty: function() {
          vm.Template.templateArticle.reason = _.replace(vm.Template.templateArticle.reason,
             vm.ReasonTree.selectedContent.accordThinkInfo, "");
          vm.ReasonTree.selectedContent.accordThinkInfo = "";
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
