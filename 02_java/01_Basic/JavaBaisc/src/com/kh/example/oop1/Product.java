package com.kh.example.oop1;

public class Product {
	String pName;
	int price;
	String brand;
	
	{
		pName ="사과";
		price = 33;
		brand = "유기농";
	}
	
	public Product() {
		super();
	}
	
	public void information() {
		System.out.println(pName+" "+price+" "+brand);
	}
	
	

}
