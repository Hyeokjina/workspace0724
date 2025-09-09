package operator;

import java.util.Scanner;

public class Practice2 {
	
	/*
	 * 키보드로 정수 두개를 입력받아 두 수의 합, 차, 곱, 나누기 값을 출력
	 * 
	 * [출력]
	 * 첫번째 정수 : (키보드입력)
	 * 두번째 정수 : (키보드입력)
	 * 
	 * 더하기 :
	 * 뺴기 :
	 * 곱하기 :
	 * 나누기 : 
	 * 나머지 :
	 * */

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		
		int a,b;
		
		System.out.printf("첫번째 정수 : ");
		a = sc.nextInt();
		
		System.out.printf("두번째 정수 : ");
		b = sc.nextInt();
		
		System.out.println("더하기 : " + (a+b));
		System.out.println("뺴기: " + (a-b));
		System.out.println("곱하기 : " + (a*b));
		System.out.println("나누기 : " + (a/b));
		System.out.println("나머지 : " + (a%b));
		

	}

}
