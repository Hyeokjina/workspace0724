package com.kh.thread.multi;

public class Task1 extends Thread {
	
	
	//20이하의 짝수 출력
	@Override
	public void run() {
		try {
			for(int i =1; i<=20; i++) {
				if(i%2 ==0) {
					System.out.println(i + " ");
				}
					Thread.sleep(400);
					}
			}catch (InterruptedException e) {
					e.printStackTrace();
			}
		}
	}
