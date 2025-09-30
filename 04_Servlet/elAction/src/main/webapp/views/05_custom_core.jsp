<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Insert title here</title>
</head>
<body>
    <h1>JSTL Core Library</h1>

    <h3>1. 변수(속성 == attribute)</h3>
    <p>
        - 변수 선언과 동시에 초기화(c:set var="변수명" value="값" [scope="저장객체"]) <br>
        - 변수를 만들고 초기값을 바로 대입해준다.
        - scope속성을 통해 저장범위(scope)를 지정할 수 있다.
        => 내장객체(scope를 결정)에 저장하기 때문에 el로 빠르게 가져와 사용할 수 있음.
    </p>

    <c:set var="num1" value="10"/>
    <%-- pageContext.setAttribute("num1",10);와 도일한 결과 --%>

    <c:set var="num2" value="20" scope="request" />
    num1 : ${num1} <br>
    num2 : ${num2} <br>

    <p>
        변수를 삭제하고자 한다면 (c:remove var="제거하고자하는 변수명" [scope="내장객체"])
        - 지정된 내장객체에서 해당 이름의 속성을 제거.
        - scope의 속성을 생략하면 모든 scope에서 같은 이름을 찾아 제거함.
    </p>

    <c:set var="result" value="${num1 + num2}" scope="session" />
    삭제 전 : ${result} <br>

    <c:remove var="result" scope="request"/>
    request영역에 result 삭제 후 : ${result}
</body>
</html>