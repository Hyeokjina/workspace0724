<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <style>
        .container{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 58px 24px;
            gap: 24px;
        }

        .container table tr{
            height: 52px;
        }


    </style>
</head>
<body>
    <jsp:include page="/views/common/menubar.jsp"/>

    <div class="container">
        <h2>회원가입</h2>
        <form action="${pageContext.request.contextPath}/insert.me" method="post">
            <table>
                <tr>
                    <td><input type="text" class="form-control" name="userId" required placeholder="아이디입력 ..."></td>
                    <td><button type="button" class="btn btn-primary" onclick="">중복확인</button></td>
                </tr>
                <tr>

                    <td><input type="password" class="form-control" name="userPwd" required placeholder="비밀번호입력"> </td>
                    <td></td>
                </tr>
                <tr>

                    <td><input type="password" class="form-control" name="password" placeholder="비밀번호 확인..."></td>
                    <td></td>
                </tr>
                <tr>

                    <td><input type="text" class="form-control" name="userName" placeholder="이름을 입력..."></td>
                    <td></td>
                </tr>
                <tr>

                    <td><input type="text" class="form-control" name="phone" placeholder="전화번호 입력..."></td>
                    <td></td>
                </tr>
                <tr>

                    <td><input type="email" class="form-control" name="email" placeholder="이메일 입력"></td>
                    <td></td>
                </tr>
                <tr>

                    <td><input type="text" class="form-control" name="address" placeholder="주소입력..."></td>
                    <td></td>
                </tr>
                <tr>
                    <td colspan="2" >
                        <label for="">
                            <input type="checkbox" name="interest" value="sport">운동
                        </label>
                        <label for="">
                            <input type="checkbox" name="interest" value="hiking">등산
                        </label>   
                        <label for="">
                            <input type="checkbox" name="interest" value="fishing">낚시
                        </label> <br>  
                        <label for="">
                            <input type="checkbox" name="interest" value="cooking">요리
                        </label>   
                        <label for="">
                            <input type="checkbox" name="interest" value="game">게임
                        </label> 
                        <label for="">
                            <input type="checkbox" name="interest" value="movie">영화
                        </label> 
                        <label for="">
                            <input type="checkbox" name="interest" value="any">기타
                        </label>      
                    </td>
                </tr>
            </table>

            <br><br>

            <div>
                <input type="submit" class="btn btn-primary" value="회원가입">
                <input type="reset" class="btn btn-primary" value="다시입력">
            </div>
        </form>
    </div>
</body>
</html>