package com.kh.example.oop4;

import java.util.Scanner;

public class ShapeMenu {
	private Scanner sc = new Scanner(System.in);
	private SquareController scr = new SquareController();
	private TriangleController tc = new TriangleController();
	
	public void inputMenu() {		
		System.out.println("===== 도형 프로그램 =====");
		System.out.println("3.삼각형");
		System.out.println("4.사각형");
		System.out.println("9.프로그램 종료");
		System.out.print("메뉴 번호 : ");
		
		int menu = sc.nextInt();
		
		switch (menu) {
			case 3 : triangleMenu();
			break;
			case 4 : squareMenu();
			break;
			case 9 : System.out.println("프로그램을 종료합니다.");
			break;
			default : System.out.println("잘못된 번호입니다. 다시 입력하세요.");
		}
		
	}
	
	public void triangleMenu() {
	 while(true) {
		System.out.println();
		System.out.println("===== 삼각형 =====");
		System.out.println("1. 삼각형 면적");
		System.out.println("2. 삼각형 색칠");
		System.out.println("3. 삼각형 정보");
		System.out.println("9. 메인으로");
		System.out.print("메뉴 번호 : ");
		
		int menu = sc.nextInt();
		
		switch (menu) {
			case 1 : inputSize(3,2);
			break;
			case 2 : inputSize(3,3);
			break;
			case 3 : printInformation(3);
			break;
			case 9 : 
				return;
			default : System.out.println("잘못된 번호입니다. 다시 입력하세요.");
		}
	 }
	}
	
	
	public void squareMenu() {
		while(true) {
		System.out.println("===== 사각형 =====");
		System.out.println("1. 사각형 둘레");
		System.out.println("2. 사각형 면적");
		System.out.println("3. 사각형 색칠");
		System.out.println("4. 사각형 정보");
		System.out.println("9. 메인으로");
		System.out.print("메뉴 번호 : ");
		
		int menu = sc.nextInt();
		
		switch (menu) {
			case 1 : inputSize(4,1);
			break;
			case 2 : inputSize(4,2);
			break;
			case 3 : inputSize(4,3);
			break;
			case 4 : printInformation(4);
			break;
			case 9 : 
				return;
			default : System.out.println("잘못된 번호입니다. 다시 입력하세요.");
		}
		}	
	}
	
	
	public void inputSize(int type, int menuNum) {
		// type -> 3 : 삼각형 / 4 : 사각형
		// menuNum -> 1: 둘레, 2: 넓이, 3: 색상
		
		switch(menuNum) {
		case 1:{
			System.out.print("높이 : ");
			double height = sc.nextDouble();
			System.out.print("넓이 : ");
			double width = sc.nextDouble();
			double perimeter = scr.calcArea(height,width);
			System.out.println("사각형의 둘레 : " + perimeter);
		}break;
		case 2:{
			System.out.print("높이 : ");
			double height = sc.nextDouble();
			System.out.print("너버 : ");
			double width = sc.nextDouble();
			
			double area;
			if (type ==3) {
				area = tc.calcArea(height, width);
				System.out.println("삼각형의 넓이 :" + area);
			} else {
				area = scr.calcArea(height, width);
				System.out.println("사각형의 넓이 : " + area);
			}
		}break;
		case 3: {
			System.out.print("색깔을 입력하세요");
			String color = sc.next();
			sc.nextLine();
			
			if(type == 3) { // 삼각형
		        tc.paintColor(color);
		        System.out.println("삼각형 색상이 " + color + "로 설정되었습니다.");
		    } else { // 사각형
		        scr.paintColor(color);
		        System.out.println("사각형 색상이 " + color + "로 설정되었습니다.");
		    }
		} break;
	
	}

}

	public void printInformation(int type) {
		 if (type == 3) { 
	            System.out.println(tc.print());
	        } else if (type == 4) {
	            System.out.println(scr.print());
	       }
	}


}
