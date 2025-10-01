<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/Core" %>
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
    request영역에 result 삭제 후 : ${result} <br>

    <c:remove var="result" />
    모든영역에 result 삭제 후 : ${result} <br>

    <hr>
    <p>
        변수 출력 (c:out value="출력하고자하는 값" [default="기본값"] [escapeXml="true \ false"]) <br>
        -> 값을 안전하게 출력할 수 있음, 값이 null이면 default를 출력하게 설정할 수 있음.
    </p>

    <br>

    <h3>2. 조건문 - if (c: if test="조건식")</h3>
    <p>
        - java에서의 if문과 같은 역활을 하는 태그 <br>
        - 조건식은 test속성안에 el구문으로 작성한다.
    </p>

    <% if(10 < 20){ %>
        <b>num2가 num1보다 큽니다.</b> <br>
    <% } %>

    <c:if test="${num1 > num2}">
        <b>num1가 num2보다 큽니다.</b> <br>
    </c:if>

    <c:if test="${num1 < num2}">
        <b>num2가 num1보다 큽니다.</b> <br>
    </c:if>

    <c:set var="str1" value="hello"/>
    <c:if test="${str1 == 'hello'}">
        <b>${str1}</b> <br>
    </c:if>

    <h3>3. 조건문 - 다중분기(c:choose/c:when/c:otherwise)</h3>
    <c:choose>
        <c:when text="${num1 > 30} ">
            <b>num1이 30보다 틉니다.</b> <br>
        </c:when>
        <c:when text="${num1 > 20} ">
            <b>num1이 20보다 틉니다.</b> <br>
        </c:when>
        <c:when text="${num1 > 10} ">
            <b>num1이 10보다 틉니다.</b> <br>
        </c:when>
        <c:otherwise>
            <b>모든 조건이 맞지않습니다.</b> <br>
        </c:otherwise>

    </c:choose>

    <h3>4. 반복문 - forEach</h3>
    <p>
        - 카운터 반복(for loop) : (c:forEach var="변수명" begin="초기값을" end="끝값" [step="반복시 증가값"])
        - 배열/컬렉션 반복(forEach) : (c:forEach var="변수명" items="순차적으로 접근할 객체(배열/컬렉션)" [varStatus="현재 접근된 요소의 "])
    </p>

    <c:forEach var="i" begin="1" end="10" step="2">
        반복확인 : ${if} <br>
    </c:forEach>

    <c:forEach var="i" begin="1" end="5">
        <h${i}>태그안에서 사용</h${i}>
    </c:forEach>

    
        <br><br><br><br><br>
</body>
</html>