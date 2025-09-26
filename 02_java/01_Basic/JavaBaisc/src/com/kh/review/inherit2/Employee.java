package com.kh.review.inherit2;

public class Employee extends Person {
	int salary;
	String dept;
	
	public Employee() {
		super();
	}
	
	public Employee(String name, int age, double height, double weight, int salary, String dept) {
		super(name, age, height, weight);
		this.salary = salary;
		this.dept = dept;
	}

	public int getSalary() {
		return salary;
	}

	public void setSalary(int salary) {
		this.salary = salary;
	}

	public String getDept() {
		return dept;
	}

	public void setDept(String dept) {
		this.dept = dept;
	}

	@Override
	public String toString() {
		return super.toString() + 
				"   사원 급여 : " + salary +
				"   사원 부서 : " + dept;
	}

}
