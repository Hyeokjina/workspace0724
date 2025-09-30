<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<h3>jsp:include</h3>
    <p>또 다른 페이지를 포함하고자 할 떄 사용하는 태그</p>

    <h4>1. 기존의 include지시어를 이용하는 방식</h4>
    <p>- 정적 include방식 => 컴파일시에 include를 수행해 주기 때문에 컴파일 시점에 포함된 형태로 구성이 된다.(.jsp에서 .java가 될때 포함)</p>

	<%--
    <%@ include file="footer.jsp"%>
	<br> <br>
	
	특징 : include하고 있는 페이지상에 선언되어있는 변수를 현재 페이지에서도 사용가능 <br>
	include한 페이지에 year변수 : <%=year %> <br><br>
	--%>
	
</body>
</html>