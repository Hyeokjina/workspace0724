package com.kh.collection.set;

import java.util.Objects;

public class Human {
	private String name;
	private int age;
	
	public Human() {
		super();
	}
	public Human(String name, int age) {
		super();
		this.name = name;
		this.age = age;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	@Override
	public String toString() {
		
		 return "[name='" + name + "', age=" + age + "]";
	}
	
	@Override
	public int hashCode() {
		//return ("" + name +age).hashCode(); ->String의 hashCode메서드를 이용
		return Objects.hash(name);//Object에 hash메서드를 이용하는 방법(비교를 원하는 모든)
	}
	@Override
	public boolean equals(Object obj) {
	    if (this == obj) return true; // 같은 객체면 true
	    if (obj == null || getClass() != obj.getClass()) return false;

	    Human h = (Human) obj;
	    return this.name.equals(h.getName()); // 이름만 비교
	}
	
	
	
}
