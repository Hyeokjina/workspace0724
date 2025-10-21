package com.kh.spring.controller;

import com.kh.spring.common.vo.PageInfo;
import com.kh.spring.model.vo.Board;
import com.kh.spring.service.BoardService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;

@Controller
public class BoardController {

    @Autowired
    private final BoardService boardService;

    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    // 게시글 목록 조회
    @GetMapping("list.bo")
    public String selectBoardList(
            @RequestParam(value = "cpage", defaultValue = "1") int currentPage,
            Model model) {

        try {
            int listCount = boardService.selectAllBoardCount();
            int pageLimit = 5;
            int boardLimit = 5;

            PageInfo pi = new PageInfo(currentPage, listCount, pageLimit, boardLimit);
            ArrayList<Board> list = boardService.selectAllBoard(pi);

            model.addAttribute("list", list);
            model.addAttribute("pi", pi);

            return "board/listView"; // → /WEB-INF/views/board/listView.jsp
        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("errorMsg", "게시글 목록 조회 실패");
            return "common/error"; // → /WEB-INF/views/common/error.jsp
        }
    }
}
