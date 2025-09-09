package com.kh.api;

public class MathAPI {
	//java.lang.Math
	//모든 필드가 상수필드, 모든 메서드가 static메서드다.
	public void method() {
		//상수필드 pi
		System.out.println("PI : " + Math.PI);
		
		//랜덤 상수
		System.out.println("랜덤 : " + Math.random());
		
		//절대값
	    System.out.println("절대값 :" + Math.abs(-10.5));

	  //올림
	    System.out.println("올림 :" + Math.ceil(-10.5));
	    
	  //반올림
	    System.out.println("반올림 :" + Math.round(-10.5));
	    
	  //버림
	    System.out.println("절대값 :" + Math.floor(-10.5));
	
	}
	

}
