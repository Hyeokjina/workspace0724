package com.kh.jsp.model.dao;

import com.kh.jsp.model.vo.Board;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import static com.kh.jsp.common.JDBCTemplate.getConnection;

public class BoardDao {

	public int insertBoard(Board board) {
	    String sql = "INSERT INTO board (board_no, board_title, board_content, board_writer, category_no, board_type, create_date) "
	               + "VALUES (SEQ_BNO.NEXTVAL, ?, ?, ?, ?, ?, SYSDATE)";

	    try (Connection conn = getConnection();
	         PreparedStatement pstmt = conn.prepareStatement(sql)) {

	        pstmt.setString(1, board.getBoardTitle());
	        pstmt.setString(2, board.getBoardContent());
	        pstmt.setInt(3, board.getBoardWriter());
	        pstmt.setInt(4, board.getCategoryNo());
	        pstmt.setInt(5, board.getBoardType());

	        int result = pstmt.executeUpdate();
	        conn.commit();
	        return result;

	    } catch (SQLException e) {
	        e.printStackTrace();
	        return 0;
	    }
	}

	public List<Board> selectBoardList() {
	    List<Board> list = new ArrayList<>();
	    String sql = "SELECT board_no, board_title, board_content, board_writer, category_no, board_type, count, create_date "
	               + "FROM board ORDER BY board_no DESC";

	    try (Connection conn = getConnection();
	         PreparedStatement pstmt = conn.prepareStatement(sql);
	         ResultSet rs = pstmt.executeQuery()) {

	        while (rs.next()) {
	            Board board = new Board();
	            board.setBoardNo(rs.getInt("board_no"));
	            board.setBoardTitle(rs.getString("board_title"));
	            board.setBoardContent(rs.getString("board_content"));
	            board.setBoardWriter(rs.getInt("board_writer"));
	            board.setCategoryNo(rs.getInt("category_no"));
	            board.setBoardType(rs.getInt("board_type"));
	            board.setReadCount(rs.getInt("count")); // count 컬럼 → readCount 필드
	            board.setCreateDate(new Date(rs.getTimestamp("create_date").getTime()));

	            // 작성자 이름, 카테고리 이름 기본값 (나중에 JOIN 가능)
	            board.setBoardWriterName("회원" + board.getBoardWriter());
	            switch(board.getCategoryNo()) {
	                case 10: board.setCategoryName("공통"); break;
	                case 20: board.setCategoryName("운동"); break;
	                case 30: board.setCategoryName("등산"); break;
	                case 40: board.setCategoryName("게임"); break;
	                case 50: board.setCategoryName("낚시"); break;
	                case 60: board.setCategoryName("요리"); break;
	                case 70: board.setCategoryName("기타"); break;
	                default: board.setCategoryName("알수없음"); break;
	            }

	            list.add(board);
	        }

	    } catch (SQLException e) {
	        e.printStackTrace();
	    }

	    return list;
	}

}
