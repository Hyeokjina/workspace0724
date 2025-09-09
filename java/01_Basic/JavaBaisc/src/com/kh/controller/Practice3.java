package com.kh.controller;

import java.util.Scanner;

public class Practice3 {
	/*
	 * 정수를(양수) 입력받아
	 * 짝수인지 홀수 인지 출력하는 프로그램
	 * 
	 * [출력]
	 * 정수 입력 : xx
	 * 짝수다/홀수다/양수가아니다.
	 * */

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);

		
		int a;
		System.out.print("정수 입력 : ");
		a = sc.nextInt();
		
	    if (a>0) {
	    	if (a % 2 == 0) {
	    		System.out.println("짝수다.");
	    	} else {
	    		System.out.println("홀수다.");
	    	}
	    } else {
	    	System.out.println("양수가 아니다.");
	    }

}
}