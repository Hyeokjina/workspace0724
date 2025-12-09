package com.kh.board.service;

import com.kh.board.entity.Board;

import java.util.List;

public interface BoardService {

    public List<Board> findAll();
    Board findById(String boardId);
    int save(Board board);
}