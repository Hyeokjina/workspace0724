package com.kh.servlet.controller;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Servlet implementation class RequsetPostServlet
 */
@WebServlet("/posttest.do")
public class RequsetPostServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public RequsetPostServlet() {
        super();
        // TODO Auto-generated constructor stub
    }
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//Get방식으로 요청시 doGet메서드를 실행하여 요청을 처리해 준다.(톰캣이 서블릿객체를 생성해서 메서드 호출까지 해줌)
				System.out.println("Post 서블릿 응답 완료");
				
				/*
				 * HttpServletRequest -> 요청시 전달된 애용들이 담겨있는 객체(사용자가 입력한 값, 요청방식, 요청자의 ip, url등....)
				 * HttpServletResponse -> 요청을 처리 후 응답할 때 사용되는 객체(어떤타입으로 응답할지, 어떤값을 응답할지등을 설정)
				 * 
				 * 요청처리를 위해서 요청시 전달된 값을 추출
				 * request의 parameter영역안에 전달된 값을 추출
				 * request.getParameter("키");
				 */
				//userName=최지원&age=55&gender=M&city=경기&height=188&food=한식&food=일식
				
				String name = request.getParameter("userName"); //최지원 | ""
				String gender = request.getParameter("gender"); // M | F | null
				int age = Integer.parseInt(request.getParameter("age")); // "55"-> 55 | ""
				String city = request.getParameter("city"); // "경기" | "서울" | "대구"등...
				double height = Double.parseDouble(request.getParameter("height")); // "180.0" -> 180.0
				
				//체크박스와같이 여러개의 값을 추출하고자할 때
				String[] foods = request.getParameterValues("food"); //["한식", "일식"] || null
				
				System.out.println("name : " + name);
				System.out.println("gender : " + gender);
				System.out.println("age : " + age);
				System.out.println("city : " + city);
				System.out.println("height : " + height);
				System.out.println("foods : " + String.join(", ", foods));
				
				//service > dao > db
				//회원추가에대한 서비스로직을 완료했다는 가정하에
				//결과는 1또는 0으로 반환
				
				//위와같은 결과에따라 응답페이지(html)을 만들어서 응답
				//즉, 여기 java코드내에서 사용자가 보게될 응답 html을 작성
				
				
				//응답 HTML을 생성하는 과정을 JSP템플릿 엔진에 위임
				//단, 응답화며에서 필요로 하는 데이터를 잘 담아서 전달해줘야한다.
				//데이터를 전달하기위한 공간 ->request에 attribute영역
				//request.setAttribute{"키","값"};
				
				request.setAttribute("name", name);
				request.setAttribute("gender", gender);
				request.setAttribute("age", age);
				request.setAttribute("city", city);
				request.setAttribute("height", height);
				request.setAttribute("foods", foods);
				
				//현재 요청을 responsePage.jsp로 전달
				//RequestDispatcher -> 서블릿에서 다른 리소스(jsp,또다른 서블릿)로 요청을 전달하거나
				//기존 응당ㅂ에 내용을 추가할 수 있게 해주는 객체
				RequestDispatcher view = request.getRequestDispatcher("/views/responsePage.jsp");
				view.forward(request, response);
			}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//Post요청이나 GET요청에 대해서 동일하게 응답을 하겠다.
		//GET과 POST를 정하기 이전에 특정 url로 요청이 되었다는 것은 특정 기능을 수행하겠다는 의미
		//결과는 같은 페이지를 출력, 응답하는 입장에서 다르게 코드를 작성할 이유가 없다.
		doGet(request, response);
	}

}
