# 裁决书文档
-----
## 新增裁决文书(编辑后的裁判文书)
### /verdict/writ
    Type: POST
#### Parameter:
    articleId   String          裁判文书id 【必填】
    templateId   String         使用大模板id 【必填】
    articleContentJson   String          带html标签的json文本 【必填】
    articleContent       String          纯文本文书内容体 【必填】
    articleHtml          String         html文本 【必填】
    causeOfAction       String          案由 【必填】
    lawCaseName         String          案件名称 【必填】
#### Result:
    null
-----

## 修改裁决文书(编辑后的裁判文书)
### /verdict/writ
    Type: PUT
#### Parameter:
    articleId   String          裁判文书id 【必填】
    articleContentJson   String          带html标签的json文本 【选填】
    articleContent       String          纯文本文书内容体 【选填】
    articleHtml          String         html文本 【选填】
    causeOfAction       String          案由 【选填】
    lawCaseName         String          案件名称 【选填】
#### Result:
    null
-----


## 查询裁决文书(编辑后的裁判文书)
### /verdict/writ
    Type: GET
#### Parameter:
    articleId   String          裁判文书id 【选填】
    causeOfAction       String          案由 【选填】
#### Result:
    articleId   String          裁判文书id
    articleContentJson   String          带html标签的json文本
    articleContent       String          纯文本文书内容体
    articleHtml          String         html文本 【选填】
    causeOfAction       String          案由
    lawCaseName         String          案件名称
    creater             String     创建人
    createTime          String     创建时间
    finalJudgment       String      最终判决标记(0表示非最终判决，1表示最终判决)
-----

## 删除裁决文书(编辑后的裁判文书)
### /verdict/writ/{articleId}
    Type: DELETE
#### Parameter:
    null
#### Result:
    null
-----

## 新增裁决文书(属性信息)
### /legal/verdict
    Type: POST
#### Parameter:
    category         String          文书类型 【选填】
    lawCaseName      String          案件名称 【选填】
    lawCaseTitle       String        文书标题  【选填】
    hearingProcedure   String        审理程序  【选填】
    lawCaseCode       String        案件号  【选填】
    chiefJudge       String        审判长  【选填】
    judge       String        审判员  【选填】
    courtClerk       String        书记员  【选填】
    courtName       String        法院名称  【选填】
    accuser       String        原告基本信息  【选填】
    accuserAgent       String        原告代理人基本信息  【选填】
    defendant       String        被告基本信息  【选填】
    defendantAgent       String        被告代理人基本信息  【选填】
    causeOfAction       String        案由  【选填】
    claims       String        诉讼请求  【选填】
    evidenceInfo       String        证据材料  【选填】
    courtCheckInfo       String        本院查明  【选填】
    verdict       String        裁判结论  【选填】
    legalBasis       String        法律依据  【选填】
    acceptedDate       String        受理日期  【选填】
    judgmentDate       String        判决日期  【选填】
#### Result:
    null
-----

## 修改裁决文书 (属性信息)
### /legal/verdict
    Type: PUT
#### Parameter:
    articleId   String          裁判文书id 【必填】
    category         String          文书类型 【选填】
    lawCaseName      String          案件名称 【选填】
    lawCaseTitle       String        文书标题  【选填】
    hearingProcedure   String        审理程序  【选填】
    lawCaseCode       String        案件号  【选填】
    chiefJudge       String        审判长  【选填】
    judge       String        审判员  【选填】
    courtClerk       String        书记员  【选填】
    courtName       String        法院名称  【选填】
    accuser       String        原告基本信息  【选填】
    accuserAgent       String        原告代理人基本信息  【选填】
    defendant       String        被告基本信息  【选填】
    defendantAgent       String        被告代理人基本信息  【选填】
    causeOfAction       String        案由  【选填】
    claims       String        诉讼请求  【选填】
    evidenceInfo       String        证据材料  【选填】
    courtCheckInfo       String        本院查明  【选填】
    verdict       String        裁判结论  【选填】
    legalBasis       String        法律依据  【选填】
    acceptedDate       String        受理日期  【选填】
    judgmentDate       String        判决日期  【选填】
#### Result:
    null
-----
## 查询裁决文书 (属性信息)
### /legal/verdict
    Type: GET
#### Parameter:
    lawCaseName      String          案件名称 【选填】
    causeOfAction       String        受理日期  【选填】
#### Result:
    articleId   String          裁判文书id
    category         String          文书类型
    lawCaseName      String          案件名称
    lawCaseTitle       String        文书标题
    hearingProcedure   String        审理程序
    lawCaseCode       String        案件号
    chiefJudge       String        审判长
    judge       String        审判员
    courtClerk       String        书记员
    courtName       String        法院名称
    accuser       String        原告基本信息
    accuserAgent       String        原告代理人基本信息
    defendant       String        被告基本信息
    defendantAgent       String        被告代理人基本信息
    causeOfAction       String        案由
    claims       String        诉讼请求
    evidenceInfo       String        证据材料
    courtCheckInfo       String        本院查明
    verdict       String        裁判结论
    legalBasis       String        法律依据
    acceptedDate       String        受理日期
    judgmentDate       String        判决日期
-----

## 删除裁决文书 (属性信息) （逻辑删除）
### /legal/verdict/{articleId}
    Type: DELETE
#### Parameter:
    null
#### Result:
    null
-----

-----
## 修改裁决文书历史 新增
### /verdict/update/log
    Type: POST
#### Parameter:
    articleId   String          裁判文书id 【必填】
    updateLabel   String          修改区块 【必填】
    updateInfo       String          修改内容 【必填】
#### Result:
    null
-----

## 修改裁决文书历史 查询
### /verdict/update/log
    Type: GET
#### Parameter:
    articleId   String          裁判文书id 【必填】
#### Result:
    articleId    String          裁判文书id
    updateTime   String          文书修改时间
    updateBy     String          修改人
    updateLabel  String          修改区块
    updateInfo   String          修改内容
-----

## 裁判文书模板 查询
### /verdict/template
    Type: GET
#### Parameter:
    articleId   String          裁判文书id 【必填】
    category   String          文书类型 【选填】eg:"民事案件"
#### Result:
    templateId    String          模板id
    category   String          文书类型
    templateName     String          模板名称
    templateArticle  json          模板内容体
-----

## 裁判文书区块模板-（经审理查明） 查询
### /verdict/fact/result
    Type: GET
#### Parameter:
    articleContent   String          计算相似度输入文本 【必填】
#### Result:
    templateArticle  String          模板内容体
    similarity       String             相似度
-----


## 裁判文书区块模板-（本院认为） 查询
### /verdict/reason
    Type: GET
#### Parameter:
    articleContent   String          计算相似度输入文本 【必填】
#### Result:
    templateArticle  String          模板内容体
    similarity       String             相似度
-----

## 裁判文书区块模板-（裁判主文） 查询
### /verdict/case/main
    Type: GET
#### Parameter:
    articleContent   String          计算相似度输入文本 【必填】
#### Result:
    templateArticle  String          模板内容体
    similarity       String             相似度
-----


## 裁判文书导出word
### /verdict/export/word
    Type: POST
#### Parameter:
    articleId   String          裁判文书id 【必填】
    lawCaseName   String         文书名称 【必填】
    articleHtml   String          文书html内容体 【必填】
#### Result:
    downloadUrl  String        下载url
-----

## 下载裁判文书word
### /download/{fileName}
    Type: GET
#### Parameter:
    null
#### Result:
    null
-----
