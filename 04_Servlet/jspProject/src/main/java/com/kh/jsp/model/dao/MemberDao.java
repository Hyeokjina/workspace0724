package com.kh.jsp.model.dao;

import java.io.FileInputStream;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Properties;

import com.kh.jsp.common.JDBCTemplate;
import static com.kh.jsp.common.JDBCTemplate.*;
import com.kh.jsp.model.vo.Member;

public class MemberDao {
	private Properties prop = new Properties();
	
	public MemberDao() {
		super();
		
		String path = JDBCTemplate.class.getResource("/db/sql/member-mapper.xml").getPath();
		
		try {
			prop.loadFromXML(new FileInputStream(path));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public int insertMember(Member m, Connection conn) {
		//insert -> 처리된 행 수 -> 반환
		
		int result = 0;
		
		PreparedStatement pstmt = null;
		String sql = prop.getProperty("insertMember");
		
		try {
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, m.getMemberId());
			pstmt.setString(2, m.getMemberPwd());
			pstmt.setString(3, m.getMemberName());
			pstmt.setString(4, m.getPhone());
			pstmt.setString(5, m.getEmail());
			pstmt.setString(6, m.getAddress());
			pstmt.setString(7, m.getInterest());
			
			result = pstmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close(pstmt);
		}
		
		return result;
	}
	
	public boolean login(Connection conn, String userId, String userPwd) {
	    boolean isValid = false;
	    String sql = prop.getProperty("loginUser");

	    try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
	        pstmt.setString(1, userId);
	        pstmt.setString(2, userPwd);

	        try (ResultSet rset = pstmt.executeQuery()) {
	            if (rset.next()) {
	                isValid = true; // 일치하는 회원 존재
	            }
	        }
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }
	    return isValid;
	}
}