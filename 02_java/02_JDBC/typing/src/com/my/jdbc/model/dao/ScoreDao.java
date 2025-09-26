package com.my.jdbc.model.dao;

import java.sql.*;
import java.util.Properties;
import java.io.FileInputStream;

public class ScoreDao {
    private Properties query = new Properties();

    public ScoreDao() {
        try {
            query.loadFromXML(new FileInputStream("resources/query.xml"));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // 점수 조회
    public int selectHighScore(Connection conn, String userId) throws SQLException {
        String sql = query.getProperty("selectHighScore");
        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, userId);
            try (ResultSet rset = pstmt.executeQuery()) {
                if (rset.next()) {
                    return rset.getInt("HIGH_SCORE");
                }
                return -1; // 점수가 없으면 -1 반환
            }
        }
    }

    // 최고 점수 삽입
    public int insertHighScore(Connection conn, String userId, int score) throws SQLException {
        String sql = query.getProperty("insertHighScore");
        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, userId);
            pstmt.setInt(2, score);
            return pstmt.executeUpdate();
        }
    }

    // 최고 점수 갱신
    public int updateHighScore(Connection conn, String userId, int score) throws SQLException {
        String sql = query.getProperty("updateHighScore");
        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, score);
            pstmt.setString(2, userId);
            return pstmt.executeUpdate();
        }
    }

    // 전체 점수 조회
    public ResultSet selectAllScores(Connection conn) throws SQLException {
        String sql = query.getProperty("selectAllScores");
        Statement stmt = conn.createStatement();
        return stmt.executeQuery(sql);
    }
    
}
