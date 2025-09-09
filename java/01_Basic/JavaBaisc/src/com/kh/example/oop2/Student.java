package com.kh.example.oop2;

public class Student {
	private int grade;
	private int classroom;
	private String name;
	private double height;
	private char gender;
	
	//초기화 블록 : 기본값을 초기화하기 위한 코드
	{
		grade = 0;
		classroom = 0;
		name = null;
		height = 0;
		gender = 'n';
	}
	
	public Student() {
		super();
	}

	public Student(int grade, int classroom, String name, double height, char gender) {
		super();
		this.grade = grade;
		this.classroom = classroom;
		this.name = name;
		this.height = height;
		this.gender = gender;
	}

	public int getGrade() {
		return grade;
	}

	public void setGrade(int grade) {
		this.grade = grade;
	}

	public int getClassroom() {
		return classroom;
	}

	public void setClassroom(int classroom) {
		this.classroom = classroom;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getHeight() {
		return height;
	}

	public void setHeight(double height) {
		this.height = height;
	}

	public char getGender() {
		return gender;
	}

	public void setGender(char gender) {
		this.gender = gender;
	}
	
	public void information() {
	    System.out.println("학년 : " + grade + 
		           ", 반 : " + classroom + 
		           ", 이름 : " + name + 
		           ", 키 : " + height + 
		           ", 성별 : " + gender); 
	}


}
