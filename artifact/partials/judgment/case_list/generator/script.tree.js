(function(){
  var module = angular.module('app.judgment');

  module.constant('TreeData', [
    {
      name: "标题",
      id: "",
      children: [
        { name: "法院名称", id: "courtName" },
        { name: "文书名称", id: "lawCaseTitle" },
        { name: "案号", id: "lawCaseCode" }
      ]
    },
    {
      name: "首部",
      id: "",
      children: [
        { name: "当事人", id: "accuser" },
        { name: "当事人", id: "accuserAgent" },
        { name: "当事人", id: "defendant" },
        { name: "当事人", id: "defendantAgent" },
        { name: "案件由来及审理经过", id: "caseGeneral" }
      ]
    },
    {
      name: "事实",
      id: "",
      children: [
        { name: "诉讼请求", id: "claims" },
        { name: "证据", id: "argued" },
        { name: "事实", id: "factResult" }
      ]
    },
    { name: "理由", id: "reason" },
    { name: "裁判主文", id: "caseMain" },
    {
      name: "尾部",
      id: "",
      children: [
        { name: "诉讼费用负担", id: "legalCosts" },
        { name: "告知事项", id: "informInfo" }
      ]
    },
    {
      name: "落款",
      children: [
        { name: "署名", id: "chiefJudge" },
        { name: "署名", id: "judge" },
        { name: "署名", id: "courtClerk" },
        { name: "日期", id: "judgmentDate" }
      ]
    }
  ]);

  module.constant('TreeOptions', {
      nodeChildren: "children",
      dirSelectable: true,
      injectClasses: {
        ul: "a1",
        li: "a2",
        liSelected: "a7",
        iExpanded: "a3",
        iCollapsed: "a4",
        iLeaf: "a5",
        label: "a6",
        labelSelected: "a8"
      }
  });


})();
