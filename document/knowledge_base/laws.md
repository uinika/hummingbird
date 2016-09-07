#法律条款
-----
##查询法律条款
### /find/law
    Type:GET
#### Parameter:
      quote               String          引用(格式:《法律名称》+第几条，例如：中华人民共和国合同法》第一百零一条)  【必填】
#### Result:
      id                  String          法律条款ID
      articleName         String          法律名称
      chapters            String          第几章
      chapters_content    String          第几章内容
      sections            String          第几节
      sections_content    String          第几节内容
      orders              String          第几条
      paragraphs          String          第几款
      terms               String          第几项
      items               String          第几目
      quote               String          引用
      quote_content       String          引用内容
 -----