package com.kh.jsp.model.dao;

import static com.kh.jsp.common.JDBCTemplate.close;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import com.kh.jsp.model.vo.Board;

public class BoardDao {

    // 게시글 등록
    public int insertBoard(Board board, Connection conn) {
        int result = 0;
        String sql = "INSERT INTO BOARD (BOARD_NO, BOARD_TITLE, BOARD_CONTENT, BOARD_WRITER, CATEGORY_NO, BOARD_TYPE, CREATE_DATE, STATUS) " +
                     "VALUES (SEQ_BNO.NEXTVAL, ?, ?, ?, ?, ?, SYSDATE, 'Y')";

        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, board.getBoardTitle());
            pstmt.setString(2, board.getBoardContent());
            pstmt.setInt(3, board.getBoardWriter());
            pstmt.setInt(4, board.getCategoryNo());
            pstmt.setInt(5, board.getBoardType());

            result = pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return result;
    }

    // 게시글 리스트 조회
    public List<Board> selectBoardList(Connection conn) {
        List<Board> list = new ArrayList<>();
        String sql = "SELECT B.BOARD_NO, B.BOARD_TITLE, B.BOARD_CONTENT, B.BOARD_WRITER, " +
                     "M.MEMBER_NAME AS WRITER_NAME, B.CATEGORY_NO, C.CATEGORY_NAME, " +
                     "B.COUNT AS READ_COUNT, B.CREATE_DATE, B.STATUS " +
                     "FROM BOARD B " +
                     "JOIN MEMBER M ON B.BOARD_WRITER = M.MEMBER_NO " +
                     "JOIN CATEGORY C ON B.CATEGORY_NO = C.CATEGORY_NO " +
                     "WHERE B.STATUS = 'Y' " +
                     "ORDER BY B.BOARD_NO DESC";

        try (PreparedStatement pstmt = conn.prepareStatement(sql);
             ResultSet rs = pstmt.executeQuery()) {

            while(rs.next()) {
                Board board = new Board();
                board.setBoardNo(rs.getInt("BOARD_NO"));
                board.setBoardTitle(rs.getString("BOARD_TITLE"));
                board.setBoardContent(rs.getString("BOARD_CONTENT"));
                board.setBoardWriter(rs.getInt("BOARD_WRITER"));
                board.setBoardWriterName(rs.getString("WRITER_NAME"));
                board.setCategoryNo(rs.getInt("CATEGORY_NO"));
                board.setCategoryName(rs.getString("CATEGORY_NAME"));
                board.setReadCount(rs.getInt("READ_COUNT"));
                board.setCreateDate(rs.getDate("CREATE_DATE"));

                list.add(board);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return list;
    }

    // 게시글 상세 조회
    public Board selectBoard(Connection conn, int boardNo) {
        Board board = null;
        String sql = "SELECT B.BOARD_NO, B.BOARD_TITLE, B.BOARD_CONTENT, B.BOARD_WRITER, " +
                     "M.MEMBER_NAME AS WRITER_NAME, B.CATEGORY_NO, C.CATEGORY_NAME, " +
                     "B.COUNT AS READ_COUNT, B.CREATE_DATE, B.STATUS " +
                     "FROM BOARD B " +
                     "JOIN MEMBER M ON B.BOARD_WRITER = M.MEMBER_NO " +
                     "JOIN CATEGORY C ON B.CATEGORY_NO = C.CATEGORY_NO " +
                     "WHERE B.BOARD_NO = ?";

        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, boardNo);

            try (ResultSet rs = pstmt.executeQuery()) {
                if(rs.next()) {
                    board = new Board();
                    board.setBoardNo(rs.getInt("BOARD_NO"));
                    board.setBoardTitle(rs.getString("BOARD_TITLE"));
                    board.setBoardContent(rs.getString("BOARD_CONTENT"));
                    board.setBoardWriter(rs.getInt("BOARD_WRITER"));
                    board.setBoardWriterName(rs.getString("WRITER_NAME"));
                    board.setCategoryNo(rs.getInt("CATEGORY_NO"));
                    board.setCategoryName(rs.getString("CATEGORY_NAME"));
                    board.setReadCount(rs.getInt("READ_COUNT"));
                    board.setCreateDate(rs.getDate("CREATE_DATE"));
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return board;
    }

    // 게시글 수정
    public int updateBoard(Board board, Connection conn) {
        int result = 0;
        String sql = "UPDATE BOARD SET BOARD_TITLE = ?, BOARD_CONTENT = ?, CATEGORY_NO = ?, MODIFY_DATE = SYSDATE WHERE BOARD_NO = ?";

        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, board.getBoardTitle());
            pstmt.setString(2, board.getBoardContent());
            pstmt.setInt(3, board.getCategoryNo());
            pstmt.setInt(4, board.getBoardNo());

            result = pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return result;
    }

    // 게시글 삭제 (논리 삭제)
    public int deleteBoard(int boardNo, Connection conn) {
        int result = 0;
        String sql = "UPDATE BOARD SET STATUS = 'N' WHERE BOARD_NO = ?";

        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, boardNo);
            result = pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return result;
    }
}
