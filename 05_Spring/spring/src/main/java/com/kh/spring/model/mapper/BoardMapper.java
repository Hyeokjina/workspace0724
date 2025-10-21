package com.kh.spring.model.mapper;

import com.kh.spring.common.vo.PageInfo;
import com.kh.spring.model.vo.Board;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;

@Mapper
public interface BoardMapper {
    int selectAllBoardCount();
    ArrayList<Board> selectAllBoard(@Param("pi") PageInfo pi);
}