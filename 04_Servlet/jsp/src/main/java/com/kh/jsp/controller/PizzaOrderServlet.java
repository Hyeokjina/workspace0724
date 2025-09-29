package com.kh.jsp.controller;

import java.io.IOException;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


@WebServlet("/confirmPizza.do")
public class PizzaOrderServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
   
    public PizzaOrderServlet() {
        super();
        // TODO Auto-generated constructor stub
    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String userName = request.getParameter("userName");
	    String phone = request.getParameter("phone");
	    String address = request.getParameter("address");
	    String message = request.getParameter("message");
	    String pizza = request.getParameter("pizza");
	    String payment = request.getParameter("payment");
	    String[] toppings = request.getParameterValues("topping");
	    String[] sides = request.getParameterValues("side");
	    
	    int totalPrice = 0;

	    // 피자 가격
	    if ("콤비네이션".equals(pizza)) {
	        totalPrice += 20000;
	    } else if ("치즈피자".equals(pizza) || "포테이토피자".equals(pizza)) {
	        totalPrice += 23000;
	    } else {
	        totalPrice += 25000;
	    }

	    // 토핑 가격
	    if (toppings != null) {
	        for (String topping : toppings) {
	            switch (topping) {
	                case "베이컨":
	                case "파인애플":
	                    totalPrice += 3000;
	                    break;
	                case "치즈크러스트":
	                case "치즈바이트":
	                    totalPrice += 2000;
	                    break;
	                default:
	                    totalPrice += 1000;
	            }
	        }
	    }

	    // 사이드 가격
	    if (sides != null) {
	        for (String side : sides) {
	            switch (side) {
	                case "환타":
	                case "콜라":
	                    totalPrice += 3000;
	                    break;
	                case "핫소스":
	                case "파마산":
	                case "피클":
	                    totalPrice += 2000;
	                    break;
	                default:
	                    totalPrice += 1000;
	            }
	        }
	    }

	    request.setAttribute("userName", userName);
	    request.setAttribute("phone", phone);
	    request.setAttribute("address", address);
	    request.setAttribute("message", message);
	    request.setAttribute("pizza", pizza);
	    request.setAttribute("payment", payment);
	    request.setAttribute("toppings", toppings);
	    request.setAttribute("sides", sides);
	    request.setAttribute("toppingsStr", String.join(", ", toppings != null ? toppings : new String[]{}));
	    request.setAttribute("sidesStr", String.join(", ", sides != null ? sides : new String[]{}));
	    request.setAttribute("totalPrice", totalPrice);
	    
	    
		
		RequestDispatcher view = request.getRequestDispatcher("/views/pizza/pizzaPayment.jsp");
		view.forward(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}