<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>피자 주문페이지</h1>
    <h2>주문내역</h2>
    <b>[주문자 정보]</b>
        <ul>
            <li>
                성함 : ${userName}
            </li>
            <li>
                전화번호 : ${phone}
            </li>
            <li>
                주소 : ${address}
            </li>
            <li>
                요청사항 : ${message}
            </li>
        </ul>

    <br>

    <p><b>[주문 정보]</b></p>
        <ul>
            <li>
                피자 : ${pizza}
            </li>
            <li>
                토핑 : ${toppingsStr}
            </li>
            <li>
                사이드 : ${sidesStr}
            </li>
            <li>
                결제방식 : ${payment}
            </li>
        </ul>
        
        <br>
     <h3>총 결제 금액 : ${totalPrice} 원</h3>
</body>
</html>