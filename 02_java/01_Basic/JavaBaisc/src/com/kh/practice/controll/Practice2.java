package com.kh.practice.controll;
import java.util.Scanner;

public class Practice2 {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		
		System.out.println("# 입력 : ");
		
		int a;
		a=sc.nextInt();
		int b;
		b=sc.nextInt();
		int c;
		c=sc.nextInt();
		System.out.println(a + " " + b + " " + c);
		
		System.out.println("# 출력: ");
		
		if (a==b && a!=c) {
			System.out.println(1000+ (a*100));
		} else if (a==c && a!=b) {
			System.out.println(1000+ (a*100));
		} else if (c==b && c!=a) {
			System.out.println(1000+ (c*100));
		} else if (a==b && a==c) {
			System.out.println(10000+ (a*1000));
		}  else if (a!=b && a!=c && b!=c) {
						if (a>b && a>c) {
							System.out.println(a*100);
						}if (b>a && b>c) {
							System.out.println(b*100);
						}if (c>b && c>a) {
							System.out.println(c*100);
						}
		} 
		
		/*
		 * int max = a > b ? a : b;
		 * max = max > c ? max : c;
		 * or
		 * int max = Math.max(a,b);
		 * mxa = Math.max(max,c); 
		 * */
	}

}
