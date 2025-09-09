package com.kh.example.abstractNInterface;

public class Run {

	public static void main(String[] args) {
		PhoneController pc = new PhoneController();
		String[] info = pc.method(); 
		
		for(String m : info) {
			System.out.println(m);
		}

	}

}
