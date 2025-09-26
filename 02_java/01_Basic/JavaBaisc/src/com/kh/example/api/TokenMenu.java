package com.kh.example.api;

import java.util.Scanner;

public class TokenMenu {
	Scanner sc = new Scanner(System.in);
	TokenController tc = new TokenController();
	
	public void mainMenu() {
		while (true) {
		System.out.println("1. 지정 문자열");
		System.out.println("2. 입력 문자열");
		System.out.println("9. 프로그램 끝내기");
		System.out.print("메뉴 번호 : ");
		int num =sc.nextInt();
		
		
		switch(num) {
		case 1:
			tokenMenu();
			System.out.println();
			System.out.println("--------------------");
		break;
		case 2:
			inputMenu();
			System.out.println();
			System.out.println("--------------------");
		break;
		case 9:
			System.out.println("프로그램을 종료합니다.");
		return;
		default:
			System.out.println("잘못 입력하셨습니다. 다시 입력하세요.");
			System.out.println();
			System.out.println("--------------------");
		break;
		}
		}
	}
	
	public void tokenMenu() {
		String str = ("J a v a P r o g r a m ");
		System.out.println("토큰 처리 전 개수 : "+ str);
		System.out.println("토큰 처리 전 글자 : "+ str.length());
		
		//String after = tc.afterToken(str);
		System.out.println("토큰 처리 후 글자 : "+ tc.afterToken(str));
		System.out.println("토큰 처리 후 개수 : "+ tc.afterToken(str).length());
		System.out.println("모두 대문자로 변환 : "+ tc.afterToken(str).toUpperCase());		
	}
	
	public void inputMenu() {
		System.out.print("문자열을 입력하세요 :");
		String str = sc.next();
		System.out.println("첫 글자 대문자 : " + tc.firstCap(str));
		System.out.print("찾을 문자 하나를 입력하세요 : ");
		char ch = sc.next().charAt(0);
		System.out.println(ch+"문자가 들어간 개수 : "+ tc.findChar(str, ch));
	}
}
