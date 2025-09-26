package com.kh.practice.array;

import java.util.Scanner;

public class Practice1 {
/*
 * 정수 N개로 이루어진 수열 A와 정수 X가 주어집니다. 
 * 이때, 수열 A에서 X보다 작은 수를 모두 입력된 순서대로 공백 한 칸으로 구분하여 출력하는 프로그램을 작성하세요. 
 * */
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		
		int n = sc.nextInt();
		int x = sc.nextInt();
		
		int[] iArr = new int[n];
		
		for (int i=0; i<n; i++) {
			iArr[i] = sc.nextInt();
			
		}
		
		for(int i=0; i<iArr.length; i++) {
			if(iArr[i] < x) {
				System.out.print(iArr[i]+" ");
			}
		}
		sc.close();
	

	}

}
