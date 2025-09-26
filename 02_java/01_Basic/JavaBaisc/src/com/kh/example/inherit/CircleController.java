package com.kh.example.inherit;

public class CircleController {
Circle c = new Circle();
	
	public String calcCircum(int x, int y, int radius) {
		c.setX(x);
		c.setY(y);
		c.setRadius(radius);
		double area = Math.PI * radius * radius;
		return c.toString()+  " , 둘레 : " + area;
	}
	
	public String calcArea(int x, int y, int radius) {
        c.setX(x);
        c.setY(y);
        c.setRadius(radius);

        double circum = 2 * Math.PI * radius;
        return c.toString() + " , 면적 : " + circum;
    }

}
