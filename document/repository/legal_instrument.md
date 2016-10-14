-----
## 主页面输入关键字查询裁决文书基本信息
### /legal/find
    Type:GET
#### Parameter:
    param               String          模糊匹配参数(匹配项包括法院名称（courtName）、裁决文书编号（caseNo）、原告（plaintiff）、被告（defendant）、案由（caseBrief）)
#### Result:
    rowKey              String          编号
    title               String          标题
    courtName           String          法院名称
    docType             String          裁决文书类型
    caseNO              String          案号
    judgementPhase      String          审理程序
    plaintiff           String          原告
    defendant           String          被告
    caseBrief           String          案由
    chiefJudge          String          审判长
    judge               String          审判员
    judgeDate           String          审判日期
    clerk               String          书记员
    title               String          标题
    judgeDate           String          审判日期--数据库格式
    orgHtml             String          文件原始内容（html）
    orgText             String          文件原始内容（文本）
    createTime          String          创建时间
 ----
##查询裁决文书不同案件的类型和该类型的案件数量
### /legal/find/findClass
    Type:GET
#### Parameter:
    null
#### Result:
    name          String         案件类型名称
    value         String         该案件类型的案件数
----

##裁判文书（文书类型）统计
### /verdict/count/by/doctype
  Type:GET
#### Parameter:
  null
#### Result:
  docType   String         文书类型
  verdictNum  String       统计数量
----

##裁判文书（法院等级）统计
### /verdict/count/by/courtlevel
  Type:GET
#### Parameter:
    null
#### Result:
    courtLevel   String         法院等级
    verdictNum  String       统计数量
----

##裁判文书（判决日期）统计
### /verdict/count/by/judgmentdate
    Type:GET
#### Parameter:
    null
#### Result:
    yearMonth   String         判决日期（年月）
    verdictNum  String       统计数量
----

##裁判文书（法院 地区）统计 返回树结构
### /verdict/count/by/courtplace
    Type:GET
#### Parameter:
    null
#### Result:
    courtPlace  String       地区
    verdictNum  String       统计数量
    childNode   Object       法院名称统计
    {
        courtName   String         法院
        verdictNum  String       统计数量
    }
----

##裁判文书（案由）统计 （返回一棵树节点）
### /verdict/count/by/casebrief
    Type:GET
#### Parameter:
    null
#### Result:
    caseBriefName   String        案由
    verdictNum   String       统计数量
    childNode       Object     子节点
----

##裁判文书分类查询（案由、法院层级、地域、判决日期、文书类型、关键词）
### /verdict/search/by/category
    Type:GET
#### Parameter:
    causeOfAction    String        案由[选填]
    judgmentDate     String        判决日期[选填] eg:201603
    courtLevel       String        法院层级[选填]
    courtPlace       String        地域[选填]
    docType          String        文书类型[选填]
    keyword          String        关键词[选填]
#### Result:
    title            String        文书标题（“原告”诉“被告”“案由”“文书类型” 即：plaintiff诉defendant case_brief doc_type）
    court_place      String        法院所在地（省、直辖市）'
    judgement_phase  String        审理程序
    create_time      String        创建时间
    case_type        String        案件类型
    legal_basis      String        法律依据
    publish_date     String        发布日期
    court_level      String        法院级别
    related_case_no  String        关联文书案号 eg: 二审的案子关联一审的案子案号
    parties          String        当事人
    court_name	     String        法院名称
    doc_type	     String        文书类型
    case_brief       String        案由
    case_no		     String        案号
    plaintiff	     String        原告
    plain_represent	 String        原告法定代表人
    plain_agent      String	       原告委托人
    defendant	     String	       被告
    defend_represent String	       被告法定代表人
    defend_agent	 String        被告委托人
    fact	         String	       陈述事实
    discern	    	 String        法院查证
    accord	    	 String        法院依据
    judge_res	     String	       法院判决
    judgers	    	 String        法官陪审员
    clerks	    	 String        书记员
    judge_date	     String	       判决日期
    ori_text	     String	       原文案
    bz1              String        预留字段（判决日期-年月 做统计时使用）
    bz2              String        预留字段
----

