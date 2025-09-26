package com.kh.example.inherit;

import java.util.Scanner;

public class PointMenu {
	Scanner sc= new Scanner(System.in);
	CircleController cc = new CircleController();
	RectangleController rc = new RectangleController();
	
	public void mainMenu() {
	 while(true) {
		System.out.println("==== 메뉴 =====");
		System.out.println("1. 원");
		System.out.println("2. 사각형");
		System.out.println("9. 끝내기");
		System.out.print("메뉴 번호 : ");
		
		int num = sc.nextInt();
		
		switch (num) {
		case 1 : circleMenu();
		break;
		case 2 : rectangleMenu();
		break;
		case 9 : System.out.println("프로그램을 종료합니다.");
		return;
		default : System.out.println("잘못된 번호입니다. 다시 입력하세요.");
	    }
	  }
	}
	
	public void circleMenu() {
		while(true) {
		System.out.println("===== 원 메뉴 =====");
		System.out.println("1. 원 둘레");
		System.out.println("2. 원 넓이");
		System.out.println("9. 메인으로");
		System.out.print("메뉴 번호 : ");
		
		int num = sc.nextInt();
		switch (num) {
		case 1 : calcCircum();
		break;
		case 2 : calcCircleArea();
		break;
		case 9 : mainMenu();
		break;
		default : System.out.println("잘못된 번호입니다. 다시 입력하세요.");
	    }
		}
	}
	
	public void rectangleMenu() {
		while(true) {
		System.out.println("===== 사각형 메뉴 =====");
		System.out.println("1. 사각형 둘레");
		System.out.println("2. 사각형 넓이");
		System.out.println("9. 메인으로");
		System.out.print("메뉴 번호 : ");

		
		int num = sc.nextInt();
		switch (num) {
		case 1 : calcPerimeter();
		break;
		case 2 : calcRectArea();
		break;
		case 9 : mainMenu();
		break;
		default : System.out.println("잘못된 번호입니다. 다시 입력하세요.");
	    }
		}
	}
	
	public void calcCircum() {
		System.out.print("x 좌표 : \n");
        int x = sc.nextInt();
        System.out.print("y 좌표 : \n");
        int y = sc.nextInt();
        System.out.print("반지름 : \n");
        int r = sc.nextInt();
        
        System.out.println(cc.calcCircum(x, y, r));
	}
	
	public void calcCircleArea() {
		System.out.println("x 좌표 : ");
        int x = sc.nextInt();
        System.out.println("y 좌표 : ");
        int y = sc.nextInt();
        System.out.println("반지름 : ");
        int r = sc.nextInt();
        
        System.out.println(cc.calcArea(x, y, r));
	}
	
	public void calcPerimeter() {
		System.out.println("x 좌표 : ");
        int x = sc.nextInt();
        System.out.println("y 좌표 : ");
        int y = sc.nextInt();
        System.out.println("높이 : ");
        int h = sc.nextInt();
        System.out.println("너비 : ");
        int w = sc.nextInt();
        
        System.out.println(rc.calcPerimeter(x, y, w, h));
	}
	
	public void calcRectArea() {
		System.out.println("x 좌표 : ");
        int x = sc.nextInt();
        System.out.println("y 좌표 : ");
        int y = sc.nextInt();
        System.out.println("높이 : ");
        int h = sc.nextInt();
        System.out.println("너비 : ");
        int w = sc.nextInt();
        
        System.out.println(rc.calcArea(x, y, w, h));
	}
}
