package com.kh.thread.runable;
//스레드를 만드는 방법1. Runnable 인터페이스를 구한다.
public class MyRunable implements Runnable{

	@Override
	public void run() {
		int n1 =20;
		int n2 =30;
		
		//Thread.currentThread() -> 지금 실행중인 스레드 정보 가져오기
		String name = Thread.currentThread().getName();
		System.out.println(name + " : " + (n1+n2));
		
		
	}
	
	

}
