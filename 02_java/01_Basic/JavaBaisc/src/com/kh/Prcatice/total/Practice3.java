package com.kh.Prcatice.total;

import java.util.Scanner;

public class Practice3 {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in) ;
		
		String input = sc.next();
	        input = input.toUpperCase();  // 대문자 변환

	        int[] counts = new int[26];  // 알파벳 빈도 저장

	        // 빈도 계산
	        for (int i = 0; i < input.length(); i++) {
	            char ch = input.charAt(i);
	            counts[ch - 'A']++;
	        }

	        int maxCount = 0;
	        int maxIndex = 0;
	        boolean isDuplicate = false;

	        // 최대 빈도 찾기 및 중복 체크
	        for (int i = 0; i < 26; i++) {
	            if (counts[i] > maxCount) {
	                maxCount = counts[i];
	                maxIndex = i;
	                isDuplicate = false;
	            } else if (counts[i] == maxCount) {
	                isDuplicate = true;
	            }
	        }
	        
	        System.out.println(isDuplicate ? "?" : (char)(maxIndex + 'A'));

	        sc.close();
	    

	}

}