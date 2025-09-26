package com.kh.practice.controll;

import java.util.Scanner;

public class Practice3 {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		
		int age;
		String day;
		int price =0;
		
		System.out.print("나이를 입력하세요 : ");
		age = sc.nextInt();
		sc.nextLine();
		
		System.out.printf("요일을 입력하세요 : ");
		day = sc.next();
		
		
		switch (day) {
		case "월":
		case "화":
		case "수":
		case "목":
		case "금":
			if (age>=0 && age<=12 ) {
				System.out.println("어린이 요금입니다. (주말 할인 적용없음)");
				price=5000;
				System.out.println("최종 요금은" + price);			
			}else if (age>=13 && age<=18 ) {
				System.out.println("청소년 요금입니다. (주말 할인 적용없음)");
				price=7000;
				System.out.println("최종 요금은" + price);
			} else if ( age>=19 ) {
				System.out.println("성인 요금입니다. (주말 할인 적용없음)");
				price=10000;
				System.out.println("최종 요금은" + price);
			}
		break;
		case "토":
		case "일":
			if (age>=0 && age<=12 ) {
				System.out.println("어린이 요금입니다. (주말 할인 적용)");
				price=5000;
				System.out.println("최종 요금은 " + (int)(price-(price*0.2)));			
			}else if (age>=13 && age<=18 ) {
				System.out.println("청소년 요금입니다. (주말 할인 적용)");
				price=7000;
				System.out.println("최종 요금은 " + (int)(price-(price*0.2)));
			} else if ( age>=19 ) {
				System.out.println("성인 요금입니다. (주말 할인 적용)");
				price=10000;
				System.out.println("최종 요금은 " + (int)(price-(price*0.2)));
			}
		break;
		}
				
	
	}

}
