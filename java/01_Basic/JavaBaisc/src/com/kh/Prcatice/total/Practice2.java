package com.kh.Prcatice.total;

import java.util.Scanner;

public class Practice2 {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in) ;

		String m = sc.next();
		boolean pd = true;
		int len = m.length();
		
		for (int i =0; i<len/2; i++) {
			if(m.charAt(i) != m.charAt(len -1 -i)) {
				pd =false;
			}
		}
		
		System.out.println(pd ?  1 : 0);
		
		

	}

}
