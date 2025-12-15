package com.kh.board.mapper;

import com.kh.board.entity.Board;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BoardMapper {
    List<Board> findAll();
    Board findById(String boardId);
    int save(Board board);
    int updateById(Board board);
    int deleteById(String boardId);
}