package com.kh.controller;

import java.util.Scanner;

public class Practice2 {
	/*
	 * 성별을(m/f)(대소문자 상관x)입력 받아 남학생인지 여학생이지
	 * 출력하는 프로그램을 작성하라
	 * 
	 * [출력]
	 * 성별(m/f) : x
	 * 여학생입니다 / 남학생입니다./ 잘못입력하셨습니다.
	 * */

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		
	    String a;
		String b = "학생";
		System.out.printf("성별(m/f) : ");
		a = sc.next();
		
		switch (a) {
		case "m" :
		case "M" :
			b="남학생입니다.";
			break;
		case "f" :
		case "F" :
			b="여학생입니다.";
			break;
		default :
			b="잘못입력하셨습니다.";
		}
		
		System.out.println(b);
			
			
		}

	}


