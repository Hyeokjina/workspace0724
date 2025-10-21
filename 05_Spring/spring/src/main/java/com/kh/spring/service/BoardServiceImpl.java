package com.kh.spring.service;

import com.kh.spring.common.vo.PageInfo;
import com.kh.spring.model.vo.Board;
import com.kh.spring.model.mapper.BoardMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class BoardServiceImpl implements BoardService {

    private final BoardMapper boardMapper;

    @Autowired
    public BoardServiceImpl(BoardMapper boardMapper) {
        this.boardMapper = boardMapper;
    }

    @Override
    public int selectAllBoardCount() {
        return boardMapper.selectAllBoardCount();
    }

    @Override
    public ArrayList<Board> selectAllBoard(PageInfo pi) {
        return boardMapper.selectAllBoard(pi);
    }
}
