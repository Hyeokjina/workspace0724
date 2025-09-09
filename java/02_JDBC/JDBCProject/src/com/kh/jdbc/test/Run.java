package com.kh.jdbc.test;

import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

/*
 * JDBC를 사용하기 위해서는 자바 프로젝트에 JDBC 드라이버를 추가해야 합니다.
 * 프로젝트 우클릭 -> Properties -> Java Build Path -> Libraries -> Add External JARs -> ojdbc.jar 추가
 * 
 * JDBC용 객체
 * - Connection : DB의 연결정보를 담고 있는 객체
 * - [Prepared]Statement : 연결된 DB에 sql문을 전달해서 실행하고 결과를 받아내는 객체
 * - ResultSet : SLEECT문 실행 후 조회된 결과를 담는 객체
 */

public class Run {
	
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Connection conn = null; // DB 연결 정보 보관 객체
        Statement stmt = null;  // SQL문을 전달하고 실행 후 결과를 받을 객체

        int result = 0;

        // 사용자 입력
        System.out.print("번호 : ");
        int tno = sc.nextInt();

        System.out.print("이름 : ");
        String tName = sc.next();
        sc.nextLine(); // 버퍼 정리

        // 실행할 SQL문 (SQL 뒤에 세미콜론 없음!)
        String sql = "INSERT INTO TEST VALUES(" + tno + ", '" + tName + "', SYSDATE)";

        try {
            // 1) JDBC Driver 등록
            Class.forName("oracle.jdbc.driver.OracleDriver");
            System.out.println("OracleDriver 등록 성공");

             // 2) Connection 생성 (URL, 계정명, 비밀번호)
            conn = DriverManager.getConnection(
                    "jdbc:oracle:thin:@localhost:1521:xe",
                    "C##JDBC",
                    "JDBC"
            );
            conn.setAutoCommit(false); // 트랜잭션 수동 처리

            // 3) Statement 생성
            stmt = conn.createStatement();

            // 4,5) SQL문 전달 후 결과 받음 (insert, update, delete -> 처리된 행 수)
            result = stmt.executeUpdate(sql);

            // 6) 트랜잭션 처리
            if (result > 0) {
                conn.commit();
                System.out.println("데이터 추가 성공");
            } else {
                conn.rollback();
                System.out.println("데이터 추가 실패, 롤백 처리");
            }

        } catch (ClassNotFoundException e) {
            System.out.println("OracleDriver 등록 실패!");
            e.printStackTrace();
        } catch (SQLException e) {
            System.out.println("DB 작업 중 오류 발생!");
            e.printStackTrace();
            try {
                if (conn != null) conn.rollback();
            } catch (SQLException se) {
                se.printStackTrace();
            }
        } finally {
            // 7) 자원 해제 (생성 역순)
            try {
                if (stmt != null) stmt.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        sc.close();
    }


    /*public static void main(String[] args) {
    	Connection conn = null;
    	Statement stmt = null;
    	ResultSet rset = null;
    	List<Test>list = new ArrayList<>();
    	
    	//실행할 sql
    	String sql = "SELECT * FROM TEST";
    	
    	try {
    		//1) JDBC드라이버 등록
			Class.forName("oracle.jdbc.driver.OracleDriver");
			System.out.println("OracleDriver 등록 완료");
			
			//2) Connection생성(db url, 계정명, 비밀번호)	
			conn = DriverManager.getConnection(
                    "jdbc:oracle:thin:@localhost:1521:xe",
                    "C##JDBC",
                    "JDBC"
            );
			
			//3) Statement생성
			stmt = conn.createStatement();
    	
			//4,5) sql문 전달하면서 결과를 받아(select -> ResultSet)
			rset = stmt.executeQuery(sql);
			
			//rset.next() -> rset의 다음행이 있는지 없는지를 알려주고 + 다음행을 가르킨다.
			while(rset.next()) {
				int tno = rset.getInt("TNO");
				String tName = rset.getString("TNAME");
				Date tDate = rset.getDate("TDATE");
				
				list.add(new Test(tno, tName, tDate.toLocalDate()));
			}
			
			
    	} catch (SQLException e) {
				e.printStackTrace();	
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}finally {
			try {
				rset.close();
				stmt.close();
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			
		}
    }
    
    if(list.isEmpty()) {
    	System.out.println("데이터가 없습니다.");
    	
    }else {
    	System.out.println(list);
    }
    }

	
	//3.PreparedStatement객체 사용 -> sql문 형태를 먼저 정의하고 각 데이터는 추후에 넣는 방법
	
	/*public static void main(String[] args) {
    	Scanner sc = new Scanner(System.in);
		Connection conn = null;
    	PreparedStatement pstmt = null;
    	int result =0;
    	
    	System.out.print("수정할 번호를 입력하세요 :");
    	int tno = sc.nextInt();
    	
    	System.out.print("새로운 이름을 입력하세요 :"); 
    	String newName = sc.next();
    	
    	System.out.print("새로운 날짜를 입력하세요(YYYY-MM-DD) :");
    	String newDate = sc.next()	;
    	sc.nextLine();
    	/*
    	String sql = "UDATE TEST SET TNAME = ' " + newName + 
    							", TDATE = TO_DATE('" + newDate + "', 'YYYY-MM-DD')"+
    				  "WHERE TNO = " + tno;
    	
    	String sql = "UPDATE TEST SET TNAME=?, TDATE=TO_DATE(?,'YYYY-MM-DD') WHERE TNO=?";
    	
    	try {
			Class.forName("oracle.jdbc.driver.OracleDriver");
			conn = DriverManager.getConnection(
				        "jdbc:oracle:thin:@localhost:1521:xe",
				        "C##JDBC",
				        "JDBC"
				);
			conn.setAutoCommit(false);
			
			//미완성된 sql문을 전달해서 pstmt객체 생성
			pstmt = conn.prepareStatement(sql);
			
			//pstmt에 작성하지 않은 값들을 메서드를 통해 완성시키키(? 개수만큼)
			pstmt.setString(1, newName);
			pstmt.setString(2, newDate);
			pstmt.setInt(3, tno);
			
			result = pstmt.executeUpdate();
			
			if(result > 0 ) {
				conn.commit();
			} else {
				conn.rollback();
			}
    	}catch (SQLException e) {
				e.printStackTrace();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
	
	
	if(result > 0 ) {
		System.out.println(result + "개의 행 UPDATE");
	} else {
		System.out.println("UPDATE 실패");
	}
	}*/
}   
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    