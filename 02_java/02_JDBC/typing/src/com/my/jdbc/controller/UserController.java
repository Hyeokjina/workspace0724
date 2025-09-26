package com.my.jdbc.controller;

import java.util.ArrayList;
import java.util.List;

import com.my.jdbc.model.dao.UserDao;
import com.my.jdbc.model.vo.User;
import com.my.jdbc.service.UserService;
import com.my.jdbc.view.GameUserMenu;

public class UserController {
    private UserService us = new UserService();

    public User login(String userId, String userPwd) {
        return us.login(userId, userPwd);
    }

    public void insertMember(String userId, String userPwd, String userName, String gender, String age, String email, String phone) {
        User u = new User(userId, userPwd, userName, gender, Integer.parseInt(age), email, phone);
        boolean result = us.insertUser(u);

        if(result) {
        	new GameUserMenu().displaySuccess("성공적으로 회원이 추가되었습니다.");
        } else {
        	new GameUserMenu().displayFail("회원추가에 실패하였습니다.");    
        }
    }

    public void updateUser(String userId, String userPwd, String userName, String gender, int age, String email, String phone) {
        User u = new User(userId, userPwd, userName, gender, age, email, phone);
        boolean result = us.updateUser(u);

        if(result) {
        	new GameUserMenu().displaySuccess("회원정보 수정 성공");
        } else {
        	new GameUserMenu().displayFail("회원정보 수정 실패");
        }
    }

    public void deleteUser(String userId, String userPwd) {
        
        boolean result = us.deleteUser(userId, userPwd);

        if(result) {
        	new GameUserMenu().displaySuccess("회원정보 삭제 성공");
        } else {
        	new GameUserMenu().displayFail("회원정보 삭제 실패");
        }
    }

    public void selectUserAll() {
        List<User> list = us.selectUserAllList();
        if(list.isEmpty()) {
        	new GameUserMenu().displayFail("회원목록이 없습니다.");
        } else {
        	new GameUserMenu().displayList(list, "========= 회원목록 =========");
        }
    }

    public void selectUserById(String userId) {
    	User user = us.selectUserById(userId);
    	if(user == null) {
            System.out.println("해당 아이디의 회원이 없습니다.");
        } else { 
            System.out.println(user);
        }
    }
}
