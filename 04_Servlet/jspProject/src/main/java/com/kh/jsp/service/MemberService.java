package com.kh.jsp.service;

import static com.kh.jsp.common.JDBCTemplate.*;

import java.sql.Connection;

import com.kh.jsp.model.dao.MemberDao;
import com.kh.jsp.model.vo.Member;

public class MemberService {
	
	public int insertMember(Member m) {
		Connection conn = getConnection();
		
		int result = new MemberDao().insertMember(m, conn);
		if(result > 0) {
			commit(conn);
		} else {
			rollback(conn);
		}
		close(conn);
		
		return result;
	}
	
	public Member loginMember(String userId, String userPwd) {
		Connection conn = getConnection();
		Member m = new MemberDao().loginMember(userId, userPwd, conn);
		
		close(conn);
		
		return m;
	}
}