package com.kh.practice.array2d;

import java.util.Scanner;

public class Practice1 {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		
		int m= sc.nextInt();
		int n = sc.nextInt();
		int[][] ary1 = new int [m][n];
		
		for(int i = 0; i<ary1.length;i++) {
			for(int j = 0; j<ary1[i].length; j++) {
                ary1[i][j] = sc.nextInt();
                
			}
		}
		
		int[][] ary2 = new int [m][n];
		
		for(int i = 0; i<ary2.length;i++) {
			for(int j = 0; j<ary2[i].length; j++) {
                ary2[i][j] = sc.nextInt();
                
			}
		}
		for(int i=0; i<m;i++) {
			for(int j =0; j<n; j++) {
				System.out.print(ary1[i][j]+ary2[i][j] + " ");
			}
		System.out.println();
		}
		
		

	}

}
