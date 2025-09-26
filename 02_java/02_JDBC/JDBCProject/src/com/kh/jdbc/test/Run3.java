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

public class Run3 {
	public static void main(String[] args) {
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
    	
    	/*String sql = "UDATE TEST SET TNAME = ' " + newName + 
    							", TDATE = TO_DATE('" + newDate + "', 'YYYY-MM-DD')"+
    				  "WHERE TNO = " + tno;*/
    	
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
	}
}
