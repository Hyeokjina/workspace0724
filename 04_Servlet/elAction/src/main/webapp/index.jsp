<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=h1, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>El (Expression language)</h1>

    <p>
        기존 JSP에서 사용하던 표현식 &lt;%=name%&gt; <br>
        EL 구문을 사용하면 표현하고자하는 값을 ${name}의 형식으로 출력할 수 있다. <br>
        EL은 기존 표현식보다 간결하고 null처리에 안전하다. 
    </p>

    <h4><a href="basic.do">01_EL의 기본 구문</a></h4>
    <h4><a href="operation.do">02_EL의 연산자</a></h4>

    <h1>JSP Action Tag</h1>
    <%--
    	JSP구성요소
    	1.스크립팅 원소
    		-JSP에서 직접 java 코드를 작성 할수 있는 영역
    		- 예 : 스크립틀릿(<% %>, 표현식(<%= %>), 선언문(<%! %>...)
    		
    	2. 지시어(Directive)
    		- JSP페이지의 메타데이터, 다른 JSP포함, 라이브러리 등록 등을 설정
    		- 예 : <%@ page %>, <%@ include %>, <%@ taglib %>
    		
    	3. 액션태그(Action Tag)
    		- JSP에서 특정 동작을 수행하도록 지시하는 태그
    		- XML문법기반으로 JSP기능을 확장
    		>> 표준액션태그 : <jsp:태그명></태그명>이런식으로 jsp:이라는 접두어를 사용
    		>> 커스텀액션태그 : 별도 라이브러리로 등록하여 사용하는 태그(JSTL등...)
     --%>
     
     <h3>표준 액션 태그</h3>
     <a href="views/03_action_include.jsp">01_jsp:include</a>
</body>
</html>