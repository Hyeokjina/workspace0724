package com.kh.controller;

import java.util.Scanner;

public class Practice1 {
	/*
	 * 나이를 입력받아
	 * 13세 이하면 : 어린이
	 * 13세 초과 19세 이하며 : 청소년
	 * 19세 초과 : 성인
	 * 
	 * [출력]
	 * 나이를 입력 : xx
	 * xx은 xxx에 속합니다.
	 * */

	    	public static void main(String[] args) {
			Scanner sc = new Scanner(System.in);
			
			int age;
			System.out.print("나이를 입력해 주세요 : ");
			age = sc.nextInt();
			
			if (age <= 13 && age >=0) {
				System.out.println(age+"은 어린이에 속합니다.");
			} else if (age>13 && age<=19) {
				System.out.println(age+"은 청소년에 속합니다.");
			} else {
				System.out.println("나이를 제대로 입력하세요.");
			}
	

	}

}
