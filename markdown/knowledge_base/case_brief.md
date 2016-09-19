#案由
-----
##查询案由信息列表
### /case_brief/find/list
    Type:GET
#### Parameter:
    null
#### Result(JSON对象):
    sort               String     案由大类(比如：民事案由、刑事案由)
    case_part          String    案由小类(比如民事案由下面的人格权纠纷、物权纠纷)
    case_district         String    案由板块(比如物权纠纷下面的不动产登记纠纷、所有权纠纷)
    case_cause           String     具体案由(属于板块下面)
----
-----
##查询某具体案由的解释
### /case_brief/find/explain
    Type:GET
#### Parameter:
    case_brief      String      案由名称
#### Result(JSON对象):
    释义               String     该案由的解释
    管辖          String    管辖
    相关法规         String    与该案由的相关法规
    确定该案由应该注意的问题           String     确定该案由应该注意的问题
----
##查询案由顶级分类及该分类下案由的条数
### /case_brief/find/findClass
    Type:GET
#### Parameter:
    null
#### Result:
     name          String         案由分类的名称
     value         String         该分类案由条数
----
##查询案由的解释、法规、案例条数
### case_brief/find/findLawsAndWrit
    Type:GET
#### Parameter
     caseBrief       String       案由名称
#### Result
     解释            String        解释条数
     法规            String        法规条数
     案例            String        案例条数