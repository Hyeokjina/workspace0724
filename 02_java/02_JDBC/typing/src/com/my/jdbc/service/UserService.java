package com.my.jdbc.service;

import java.sql.*;
import java.util.List;
import java.util.Properties;
import java.io.FileInputStream;

import com.my.jdbc.model.dao.UserDao;
import com.my.jdbc.model.vo.User;

public class UserService {
    private UserDao dao = new UserDao();
    private Properties dbProp = new Properties();

    public UserService() {
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
    
    //로그인
    public User login(String userId, String userPwd) {
        try (Connection conn = getConnection()) {
            return dao.loginUser(conn, userId, userPwd);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    //유저 가입
    public boolean insertUser(User u) {
        try (Connection conn = getConnection()) {
            return dao.insertUser(conn, u) > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }
    
    //유저 정보 수정
    public boolean updateUser(User u) {
        try (Connection conn = getConnection()) {
            return dao.updateUser(conn, u) > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    //유저 탈퇴
    public boolean deleteUser(String userId, String userPwd) {
        try (Connection conn = getConnection()) {
            return dao.deleteUser(conn, userId, userPwd) > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    //전체 유저 가입정보 조회
    public List<User> selectUserAllList() {
        try (Connection conn = getConnection()) {
            return dao.selectUserAllList(conn);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    //아이디로 조회
    public User selectUserById(String userId) {
        try (Connection conn = getConnection()) {
            return dao.selectUserById(conn, userId);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
}
