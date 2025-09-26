package com.kh.example.oop4;

public class Shape {
	private int type;
	private double height;
	private double width;
	private String color;
	
	{
		color= "white";
	}

	public Shape() {
		super();
	}

	public Shape(int type, double height, double width) {
		super();
		this.type = type;
		this.height = height;
		this.width = width;
	}
	

	public Shape(double height, double width) {
		super();
		this.height = height;
		this.width = width;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public double getHeight() {
		return height;
	}

	public void setHeight(double height) {
		this.height = height;
	}

	public double getWidth() {
		return width;
	}

	public void setWidth(double width) {
		this.width = width;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}
	
	public String information() {
		return "높이 "+height+" 너비"+width+" 색상"+color;
	}

}
