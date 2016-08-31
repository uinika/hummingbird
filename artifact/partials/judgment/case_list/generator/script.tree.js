(function(){
  var module = angular.module('app.judgment');

  module.constant('TreeData', [
    {
      name: "标题",
      link: "",
      children: [
        { name: "法院名称", link: "" },
        { name: "文案名称", link: "" },
        { name: "案号", link: "" }
      ]
    },
    {
      name: "首部",
      link: "",
      children: [
        { name: "当事人", link: "" },
        { name: "案件由来及审理经过", link: "" }
      ]
    },
    {
      name: "事实",
      link: "",
      children: [
        { name: "诉讼请求", link: "" },
        { name: "证据", link: "" },
        { name: "事实", link: "" }
      ]
    },
    { name: "理由", link: "" },
    { name: "裁判主文", link: "" },
    {
      name: "尾部",
      link: "",
      children: [
        { name: "诉讼费用负担", link: "" },
        { name: "告知事项", link: "" }
      ]
    },
    {
      name: "落款",
      link: "",
      children: [
        { name: "署名", link: "" },
        { name: "日期", link: "" }
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
