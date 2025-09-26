package com.kh.Prcatice.total;

import java.util.Scanner;

public class Practice4 {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in) ;
		
		String[] ary = {"c=","c-","dz=","d-","lj","nj","s=","z="};
		
		String m = sc.next();
		
		
		for(String s : ary) {
			m=m.replace(s, "!");
		}
		
		System.out.println(m.length());


	}

}

