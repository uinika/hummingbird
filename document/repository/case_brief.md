#案由
-----
##查询案由信息
### /case_brief/find/keywords
    Type:GET
#### Parameter:
      case_cause          String          案由  【必填】
#### Result:
      id                  String          案由ID
      case_district       String          板块（案由属于哪个板块）
      case_cause          String          案由
      case_explain        String          案由的释义
      case_administer     String          管辖（范围）
      case_accord         String          案由法律依据
      case_attention      String          注意问题
-----
##查询案由信息列表
### /case_brief/find/list
    Type:GET
#### Parameter:
      null
#### Result(JSON对象):
     sort               String     案由大类(比如：民事案由、刑事案由)
         --case_part          String    案由小类(比如民事案由下面的人格权纠纷、物权纠纷)
                 --case_district         String    案由板块(比如物权纠纷下面的不动产登记纠纷、所有权纠纷)
                           --case_cause           String     具体案由(属于板块下面)

----