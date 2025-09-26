package com.my.jdbc.service;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import java.io.FileInputStream;

import com.my.jdbc.model.dao.ScoreDao;

public class ScoreService {
    private ScoreDao dao = new ScoreDao();
    private Properties dbProp = new Properties();

    public ScoreService() {
        try {
            dbProp.load(new FileInputStream("resources/driver.properties"));
            Class.forName(dbProp.getProperty("driver"));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private Connection getConnection() throws SQLException {
        return DriverManager.getConnection(
            dbProp.getProperty("url"),
            dbProp.getProperty("username"),
            dbProp.getProperty("password")
        );
    }

    // 최고 점수 저장
    public int saveHighScore(String userId, int score) {
        try (Connection conn = getConnection()) {
            int existingScore = dao.selectHighScore(conn, userId);

            if (existingScore == -1) { // 기존 점수 없음
                dao.insertHighScore(conn, userId, score);
                return 2; // 최초 점수 기록
                
            } else if (score > existingScore) { // 최고점수 갱신
                dao.updateHighScore(conn, userId, score);
                return 1; // 최고점수 갱신
            } else {
                return 0; // 최고점수보다 낮음
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return -1; // 오류
        }
    }

    // 전체 랭킹 조회
    public List<String> getAllScores() {
        List<String> ranking = new ArrayList<>();
        try (Connection conn = getConnection();
             ResultSet rset = dao.selectAllScores(conn)) {
            while (rset.next()) {
                String line = rset.getString("USER_ID") + "님의 최고 스테이지는 " + rset.getInt("HIGH_SCORE") + " stage!";
                ranking.add(line);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return ranking;
    }
 
}
