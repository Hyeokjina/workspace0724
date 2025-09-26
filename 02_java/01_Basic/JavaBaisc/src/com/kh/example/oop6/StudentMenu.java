package com.kh.example.oop6;

public class StudentMenu {
	
	StudentController ssm = new StudentController();
	
	public StudentMenu() {
		System.out.println("==========학생 정보 출력==========");
		Student[] sArr = ssm.printStudent();
		 for (Student s : sArr) {
	            System.out.println(s.inform());
		}
		 System.out.println();
		 
		 System.out.println("==========학생 성적 출력==========");
		 double [] result = ssm.avgScore();
		 System.out.print("학생 점수 합계 : ");
		 System.out.println(result[0]);
		 System.out.print("학생 점수 평균 : ");
		 System.out.println(result[1]);
		 System.out.println();
		 
		 System.out.println("==========성적 결과 출력==========");
		 for(Student s : sArr) 
			 System.out.printf("%s학생은 %s입니다.%n",
					 s.getName(),s.getScore() < ssm.CUT_LINE ? "재시험 대상" : "통과");
		 		
		 }
		 
	}
	



