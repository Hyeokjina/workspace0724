package com.kh.polymorphism;

public class Avante extends Car {
	public Avante(String color, String fuel, int year) {
		super(color, fuel, year);
	}
	
	
	
	public void moveAvante() {
		System.out.println("빵빵 아반데");
	}
	
	public void dirverCar(Car car) {
		if(car instanceof Avante) {
			((Avante)car).moveAvante();
		};
	}
	

}
