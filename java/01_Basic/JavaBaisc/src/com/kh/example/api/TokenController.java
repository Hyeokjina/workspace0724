package com.kh.example.api;

import java.util.StringTokenizer;

public class TokenController {

	public TokenController() {
		super();
	}
	
	//띄어쓰기 제거 후 문자열로 반환
	public String afterToken(String str) {
		 StringTokenizer st = new StringTokenizer(str, " ");

	        StringBuilder sb = new StringBuilder();
	        while (st.hasMoreTokens()) {
	            sb.append(st.nextToken()); // 공백 제거하고 이어 붙임
	        }

	        return sb.toString();
	}
	
	//첫글자를 대문자로 변경
	public String firstCap(String input) {
	if(input==null || input.isEmpty()) {
		return input;
	} return input.substring(0,1).toUpperCase() + input.substring(1);
	}
	
	//one이 문자열에 몇개 들어갔는가? 
	public int findChar(String input, char one) {
		int count = 0;
		for(int i =0; i<input.length(); i++) {
			if(input.charAt(i)== one) {
				count++;
			}
		}return count;
	}
	
}
