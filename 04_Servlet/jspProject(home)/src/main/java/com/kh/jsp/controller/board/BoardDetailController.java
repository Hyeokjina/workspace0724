package com.kh.jsp.controller.board;

import com.kh.jsp.model.vo.Board;
import com.kh.jsp.service.BoardService;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;
import java.io.IOException;

@WebServlet("/detail.bo")
public class BoardDetailController extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private final BoardService service = new BoardService();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String boardNoStr = request.getParameter("boardNo");

        // boardNo 파라미터 체크
        if(boardNoStr == null || boardNoStr.isEmpty()) {
            response.sendRedirect(request.getContextPath() + "/list.bo");
            return;
        }

        int boardNo = Integer.parseInt(boardNoStr);

        // 조회수 증가
        int result = service.increaseReadCount(boardNo);

        // 상세 정보 가져오기
        Board board = service.selectBoard(boardNo);
        if(board == null) {
            request.setAttribute("errorMsg", "존재하지 않는 게시글입니다.");
            request.getRequestDispatcher("/views/common/error.jsp").forward(request, response);
            return;
        }

        request.setAttribute("board", board);
        request.getRequestDispatcher("/views/board/detailView.jsp").forward(request, response);
    }
}
