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

##裁判文书（法院 地区）统计
### /verdict/count/by/courtplace
    Type:GET
#### Parameter:
    null
#### Result:
    courtName   String         法院
    verdictNum  String       统计数量
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
