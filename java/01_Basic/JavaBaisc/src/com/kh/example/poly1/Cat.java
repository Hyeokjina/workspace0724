package com.kh.example.poly1;

public class Cat extends Animal{
	String color;

	public Cat() {
		super();
	}

	public Cat(String name, int age, String color) {
		super(name,age);
		this.color = color;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}
	
	public void speak() {
		System.out.println("야용!");
	}
	

}
