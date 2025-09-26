package com.kh.Prcatice.total;

import java.util.Scanner;

public class Practice1 {

	public static void main(String[] args) {
Scanner sc = new Scanner(System.in) ;
		
		int[] ary = {1,1,2,2,2,8};
		int[] ary2 = new int[6];
		int[] ary3 = new int[6];
		
		for(int i =0; i<6; i++) {
			ary2[i]=sc.nextInt();
		}
		
		for(int i =0; i<6; i++) {
			if(ary2[i] < ary[i]) {
				ary3[i] = ary[i] - ary2[i];
			}
		
			else if (ary2[i] > ary[i]) {
				ary3[i] = ary[i] - ary2[i];
			}else {
				ary3[i] = 0;
			}
		}
		
		for(int num : ary3) {
			System.out.print(num + " ");
		}

	}

}
