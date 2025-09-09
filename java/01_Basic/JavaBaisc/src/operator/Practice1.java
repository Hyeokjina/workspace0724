package operator;

import java.util.Scanner;

public class Practice1 {
	/*
	 * 키보드로 가로, 세로값을 실수형으로 입력받아 사각혀의 면적과 둘레를 계산하여 출력
	 * 면적 : 가로 * 세로
	 * 둘레 : (가로 + 세로) * 2
	 * 
	 * [출력]
	 * 가로 : (키보드로 입력)
	 * 세로 : (키보드로 입력)
	 * 
	 * 면적 : ~
	 * 둘레 : ~
	 * + 소수점 2번쨰 자리까지 출력
	 * */

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		
		float a;
		System.out.print("가로를 입력하시오 : ");
		a = sc.nextFloat();
		
		float b ;
		System.out.print("세로를 입력하시오 : ");
		b = sc.nextFloat();
		
		System.out.printf("면적 : %2f\\n", (a*b));
		System.out.printf("둘레 : %2f",(a+b)*2);
		
		
		
		

	}

}
