package com.my.jdbc.model.dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import java.io.FileInputStream;
import java.io.IOException;

import com.my.jdbc.model.vo.User;

public class UserDao {
    private Properties query = new Properties();

    public UserDao() {
        try {
            query.loadFromXML(new FileInputStream("resources/query.xml"));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    //로그인
    public User loginUser(Connection conn, String userId, String userPwd) throws SQLException {
        String sql = query.getProperty("loginUser");
        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, userId);
            pstmt.setString(2, userPwd);
            try (ResultSet rset = pstmt.executeQuery()) {
                if (rset.next()) {
                    return new User(
                        rset.getString("USER_ID"),
                        rset.getString("USER_PWD")
                    );
                }
            }
        }
        return null;
    }
    
    //유저추가
    public int insertUser(Connection conn, User u) throws SQLException {
        String sql = query.getProperty("insertUser");
        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, u.getUserId());
            pstmt.setString(2, u.getUserPwd());
            pstmt.setString(3, u.getUserName());
            pstmt.setString(4, u.getGender());
            pstmt.setInt(5, u.getAge());
            pstmt.setString(6, u.getEmail());
            pstmt.setString(7, u.getPhone());
            return pstmt.executeUpdate();
        }
    }
    
    //유저 정보변경
    public int updateUser(Connection conn, User u) throws SQLException {
        String sql = query.getProperty("updateUser"); 
        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, u.getUserName());
            pstmt.setString(2, u.getGender());
            pstmt.setInt(3, u.getAge());
            pstmt.setString(4, u.getEmail());
            pstmt.setString(5, u.getPhone());
            pstmt.setString(6, u.getUserId());
            pstmt.setString(7, u.getUserPwd());
            return pstmt.executeUpdate();
        }
    }

    
    //유저 탈퇴
    public int deleteUser(Connection conn, String userId, String userPwd) throws SQLException {
        String sql = query.getProperty("deleteUser");
        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, userId);
            pstmt.setString(2, userPwd);
            return pstmt.executeUpdate();
        }
    }
    
    
    //전체 유저 가입정보 조회
    public List<User> selectUserAllList(Connection conn) throws SQLException {
        List<User> list = new ArrayList<>();
        String sql = query.getProperty("selectUserAllList");
        try (Statement stmt = conn.createStatement();
             ResultSet rset = stmt.executeQuery(sql)) {
            while (rset.next()) {
                list.add(new User(
                    rset.getInt("USER_NO"),
                    rset.getString("USER_ID"),
                    rset.getString("USER_PWD"),
                    rset.getString("USER_NAME"),
                    rset.getString("GENDER"),
                    rset.getInt("AGE"),
                    rset.getString("EMAIL"),
                    rset.getString("PHONE"),
                    rset.getTimestamp("ENROLL_DATE").toLocalDateTime()
                ));
            }
        }
        return list;
    }
    
    //아이디로 조회
    public User selectUserById(Connection conn, String userId) throws SQLException {
        String sql = query.getProperty("selectUserById");
        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, userId);
            try (ResultSet rset = pstmt.executeQuery()) {
                if (rset.next()) {
                    return new User(
                        rset.getInt("USER_NO"),
                        rset.getString("USER_ID"),
                        rset.getString("USER_PWD"),
                        rset.getString("USER_NAME"),
                        rset.getString("GENDER"),
                        rset.getInt("AGE"),
                        rset.getString("EMAIL"),
                        rset.getString("PHONE"),
                        rset.getTimestamp("ENROLL_DATE").toLocalDateTime()
                    );
                }
            }
        }
        return null;
    }
}
