package com.kh.example.abstractNInterface;

public abstract class SmartPhone {
	private String maker;

	public SmartPhone() {
		super();
	}
	
	public abstract String printInformation();
	
	public void setMaker(String maker) {
		this.maker = maker;
	}
	
	public String getMaker() {
		return maker;
	}
}
       