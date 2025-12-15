package com.kh.board.service;

import com.kh.board.entity.Board;
import com.kh.board.mapper.BoardMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class BoardServiceImpl implements BoardService {

    private final BoardMapper boardMapper;

//    public BoardServiceImpl(BoardMapper boardMapper) {
//        this.boardMapper = boardMapper;
//    }

    @Override
    public List<Board> findAll() {
        return boardMapper.findAll();
    }

    @Override
    public Board findById(String boardId) {
        return boardMapper.findById(boardId);
    }

    @Override
    public int save(Board board) {
        return boardMapper.save(board);
    }

    @Override
    public int updateById(Board board) {
        return boardMapper.updateById(board);
    }

    @Override
    public int deleteById(String boardId) {
        return boardMapper.deleteById(boardId);
    }
}