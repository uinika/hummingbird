#查询知识库
----
##查询每个库中的记录数
### /kb/search/all
    Type:GET
#### Parameter:
    null
#### Result
    name   String   知识库名称
    number String   数量
----


##查询每个库中的今日新增记录数
### /kb/search/add_today
    Type:GET
#### Parameter:
    null
#### Result
    name   String   知识库名称
    number String   数量
----

----
##根据搜索页面输入的关键字检索知识库
### kb/search/find
    Type:GET
#### Parameter:
     type    String   查询是字库的type标记 【选填{an_you,fa_tiao,wen_shu,null}】
     keyword  String   查询关键字  【必填】
#### Result
#### type=an_you
     title     String     案由名称
     释义    String     释义
     法规     String     法规
     适用范围   String     适用范围
#### type=fa_tiao
     title   String    第几条第几款
     法律名称  String    法律名称
     内容    String    内容
#### type=wen_shu/type=null
     title   String    标题
     date    String    审判日期
     法院    String     法院名称
     编号    String     编号
