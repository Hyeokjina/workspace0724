package com.kh.practice.controll;

import java.util.Scanner;

public class Practice1 {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		
		int grade;
		System.out.print("점수를 입력하세요 : ");
		grade = sc.nextInt();
		
	
		if (grade>=90 && grade<=100) {
			System.out.println("당신의 성적은 A입니다.");
		} else if (grade>=80 && grade<=89) {
			System.out.println("당신의 성적은 B입니다.");
		} else if (grade>=70 && grade<=79) {
			System.out.println("당신의 성적은 C입니다.");
		} else if (grade>=60 && grade<=69) {
			System.out.println("당신의 성적은 D입니다.");
		} else if (grade>=0 && grade<=59) {
			System.out.println("당신의 성적은 F입니다.");
		}

	}

}
