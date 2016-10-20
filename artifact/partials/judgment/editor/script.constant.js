(function(){
  angular.module('app.judgment')
    .constant('editorConstant', {
      // Tree Data
      'TreeData': [
        {
          name: "标题",
          id: "",
          children: [
            { name: "法院名称", id: "courtName" },
            { name: "文书名称", id: "lawCaseTitle" },
            { name: "案号", id: "lawCaseCode" }
          ]
        }, {
          name: "首部",
          id: "",
          children: [
            { name: "原告", id: "accuser" },
            { name: "原告代理人", id: "accuserAgent" },
            { name: "被告", id: "defendant" },
            { name: "被告代理人", id: "defendantAgent" },
            { name: "案件由来及审理经过", id: "caseGeneral" }
          ]
        }, {
          name: "事实",
          id: "",
          children: [
            { name: "诉讼请求", id: "claims" },
            { name: "证据", id: "argued" },
            { name: "事实", id: "factResult" }
          ]
        },
        { name: "理由", id: "reason",
          children: [
            { name: "1.合同效力", id: "reason" },
            { name: "2.合同履行", id: "reason" },
            { name: "3.被告抗辩诉讼时效", id: "reason" },
            { name: "4.借款合同解除", id: "reason" },
            { name: "5.违约责任", id: "reason" },
            { name: "6.借款合同无效、撤销的法律后果", id: "reason" },
            { name: "7.是否原告诉求借款人配偶共同还款", id: "reason" },
            { name: "8.是否有担保合同", id: "reason" },
            { name: "9.是否有其他诉讼请求", id: "reason" }
          ]
        },
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
            { name: "审判长", id: "chiefJudge" },
            { name: "审判员", id: "judge" },
            { name: "书记员", id: "courtClerk" },
            { name: "判决日期", id: "judgmentDate" }
          ]
        }
      ],
      // Left Tree Options
      'TreeOptions': {
        nodeChildren: "children",
        dirSelectable: false,
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
      },
      // Left Tree Options
      'ReasonTreeOptions': {
        nodeChildren: "childNode",
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
      },
      // Medium Editor Options
      'mediumEditorOptions': {
        toolbar:false,
        spellcheck: false
      },
      'materials': [
        {tag: '案件材料', path: 'assets/images/demo/material-1.jpg'},
        {tag: '原告身份', path: 'assets/images/demo/material-2.jpg'},
        {tag: '委托代理人', path: 'assets/images/demo/material-3.jpg'},
        {tag: '起诉事项', path: 'assets/images/demo/material-4.jpg'},
        {tag: '证据', path: 'assets/images/demo/material-5.jpg'}
      ]
    })

})();
