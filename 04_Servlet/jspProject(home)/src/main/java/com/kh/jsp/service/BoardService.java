package com.kh.jsp.service;

import com.kh.jsp.model.dao.BoardDao;
import com.kh.jsp.model.vo.Board;
import java.util.List;

public class BoardService {
    private final BoardDao dao = new BoardDao();

    public int insertBoard(Board board) {
        return dao.insertBoard(board);
    }

    public List<Board> selectBoardList() {
        return dao.selectBoardList();
    }
}
