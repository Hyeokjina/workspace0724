package com.kh.example.inherit;

public class Circle extends Point{
	int radius;

	public Circle() {
		super();
	}

	public Circle(int x, int y, int radius) {
		super(x,y);
		this.radius = radius;
	}

	public int getRadius() {
		return radius;
	}

	public void setRadius(int radius) {
		this.radius = radius;
	}

	@Override
	public String toString() {
		return super.toString()	+ ", 반지름 : " + radius;
	}
	


}
