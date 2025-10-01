<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<style>
	.error-msg{
		color: yellow;
	}
</style>
</head>
<body>
	<jsp:include page="/views/common/menubar.jsp" />
	
	<h1>
		<c:out value="${errorMsg }" default= "알수 없는 오류가 발생했습니다." />
	</h1>
</body>
</html>