----
##根据搜索页面输入的关键字检索知识库
### kb/search/find
    Type:GET
#### Parameter:
     type    String   查询是字库的type标记 【选填{an_you,fa_tiao,wen_shu}】
     keyword  String   查询关键字  【必填】
#### Result
#### type=an_you
     an_you     String     案由名称
     shi__yi    String     释义
     fa_gui     String     法规
     shi_yong_fa_wei   String     适用范围
#### type=fa_tiao
     ming_cheng  String    法律名称
     tiao_kuan   String    第几条第几款
     nei_rong    String    内容
