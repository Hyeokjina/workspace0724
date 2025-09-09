package com.kh.example.inherit2;

import java.util.Scanner;

import com.kh.example.oop7.Product;

public class PersonMenu {
	Scanner sc = new Scanner(System.in);
	PersonController pc = new PersonController();
	
	public void mainMenu() {
		while (true) {
		System.out.println("학생은 최대 3명까지 저장할 수 있습니다.");
		System.out.println("현재 저장된 학생은 " +pc.printStudent().length +"명입니다.");
		System.out.println("사원은 최대 10명까지 저장할 수 있습니다.");
		System.out.println("현재 저장된 사원은 " +pc.printEmployee().length +"명입니다.");
		System.out.println("1. 학생 메뉴");
		System.out.println("2. 사원 메뉴");
		System.out.println("9. 끝내기");
		System.out.print("메뉴 번호 : ");
		
		int num = sc.nextInt();
		
		switch (num) {
		case 1:
			studentMenu();
		break;
		case 2:
			employeeMenu();
		break;
		case 9:
			System.out.println("종료합니다.");;
		return;
		}
	   }
    }
	
	public void studentMenu() {
		if(pc.personCount()[0] >= 3) {
			System.out.println("학생을 담을 수 있는 공간이 꽉 찼기 때문에 학생 추가를 종료하고 학생 메뉴로 돌아갑니다.");
		}
		while(true) {
		System.out.println("1. 학생 추가");
		System.out.println("2. 학생 보기");
		System.out.println("9. 메인으로");
		System.out.print("메뉴 번호 : ");
		
		int num = sc.nextInt();
		
		switch (num) {
		case 1:
		    while(true) {   // 학생 추가 반복
		        System.out.print("학생 이름 : ");
		        String name = sc.next();

		        System.out.print("학생 나이 : ");
		        int age = sc.nextInt();

		        System.out.print("학생 키 : ");
		        double height = sc.nextDouble();

		        System.out.print("몸무게 : ");
		        double weight = sc.nextDouble();

		        System.out.print("학년 : ");
		        int grade = sc.nextInt();

		        System.out.print("전공 : ");
		        String major = sc.next();

		        pc.insertStudent(name, age, height, weight, grade, major);

		        if(pc.personCount()[0] >= 3) {
		            System.out.println("학생 배열이 가득 찼습니다. 더 이상 추가할 수 없습니다.");
		            break;  
		        }

		        System.out.print("그만하시려면 N(또는 n), 이어하시려면 아무 키나 누르세요 : ");
		        char an = sc.next().toUpperCase().charAt(0);
		        if(an == 'N') break; 
		    }
		    break;
		case 2:
			printStudent();
		break;
		case 9:
			mainMenu();
		return;
		}
		}
	}
	
	public void employeeMenu() {
		while(true) {
		System.out.println("1. 사원 추가");
		System.out.println("2. 사원 보기");
		System.out.println("9. 메인으로");
		System.out.println("메뉴 번호 : ");
		
		int num = sc.nextInt();
		
		switch (num) {
		case 1:
			System.out.print("사원 이름 : ");
			String name = sc.next();
			
			System.out.print("사원 나이 : ");
			int age = sc.nextInt();
			
			System.out.print("사원 키 : ");
			double weight = sc.nextDouble();
			
			System.out.print("몸무게 : ");
			double height = sc.nextDouble();
			
			System.out.print("급여 : ");
			int salary = sc.nextInt();
			
			System.out.print("부서 : ");
			String dept = sc.next();
			
			pc.insertStudent(name, age, height, weight, salary, dept);
		break;
		case 2:
			printEmployee();
		break;
		case 9:
			mainMenu();
		return;
		}
		}
	}
	
	public void printStudent() {
		Student[] studnts = pc.printStudent();
		for(Student s : studnts) {
			if(s==null)
				break;
		    System.out.println(s);
		}
	}
	
	public void printEmployee() {
		Employee[] employee = pc.printEmployee();
		for(Employee e : employee) {
			if(e==null)
				break;
		    System.out.println(e);
		}
	}
}
