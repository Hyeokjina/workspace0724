package com.kh.example.oop3;

public class Run {

	public static void main(String[] args) {
		Book book1 = new Book();
		book1.inform();
		System.out.println();
		
		Book book2 = new Book("백설공주","인형나라","홍길동");
		book2.inform();
		System.out.println();
		
		
		Book book3 = new Book("헨젤과그레텔","바람나라","김춘추",20000,0.3);
		book3.inform();

	}

}
