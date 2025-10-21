package com.kh.spring.service;

import com.kh.spring.common.vo.PageInfo;
import com.kh.spring.model.vo.Board;

import java.util.ArrayList;

public interface BoardService {

    int selectAllBoardCount();
    ArrayList<Board> selectAllBoard(PageInfo pi);
}