package com.kh.practice.array2d;
import java.util.Scanner;

public class Practice2 {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		
		int m = sc.nextInt();
		int n = sc.nextInt();
		int[][] ary = new int [m][n];
		
		for(int i=0; i<m; i++) {
			for(int j = 0; j<n; j++) {
				ary[i][j]= sc.nextInt();
			}
		}
		int max = Integer.MIN_VALUE;
		int maxRow = 0;
	    int maxCol = 0;
		
	    for(int i=0; i<m; i++) {
			for(int j = 0; j<n; j++) {
				if(ary[i][j] > max) {
					max = ary[i][j];
					maxRow = i;
					maxCol = j;
				}
			}
		}
			
	    System.out.println( max);
	    System.out.println((maxRow + 1) + " " + (maxCol + 1));
        
        sc.close();


			}
		

	}


