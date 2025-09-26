package com.kh.example.inherit2;

public class PersonController {
	Student[] s = new Student[3];
	Employee[] e = new Employee[10];
	
	private int studentCount = 0; 
    private int employeeCount = 0;
	
    public int[] personCount() {
        return new int[] { studentCount, employeeCount };
    }
    
    public void insertStudent(String name, int age, double height, double weight, int grade, String major) {
    	if (studentCount < s.length) {
            s[studentCount++] = new Student(name, age, height, weight, grade, major);
        }
    }
    
    public Student[] printStudent() {
    	return s;
    }
    
    
    public void insertEmployee(String name, int age, double height, double weight, int salary, String dept) {
    	for (int i = 0; i < e.length; i++) {
            if (e[i] == null) { 
                e[i] = new Employee(name, age, height, weight, salary, dept);
                break;
            }
        }
    }
    
    public Employee[] printEmployee() {
    	return e;
    }
}
