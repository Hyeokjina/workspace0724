package com.kh.spring.service;

import com.kh.spring.model.vo.Board;
import com.kh.spring.model.vo.Category;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public interface BoardService {
    //카테고리 관련
    List<Category> getCategories();

    //게시판 관련
    public Map<String, Object> getBoardList(int currentPage);
    public int insertBoard(Board board, MultipartFile file);
    public Board getBoardById(int boardNo);
}