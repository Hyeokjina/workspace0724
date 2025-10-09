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
        String boardNoParam = request.getParameter("boardNo");
        if(boardNoParam == null) {
            response.sendRedirect(request.getContextPath() + "/list.bo");
            return;
        }

        int boardNo = Integer.parseInt(boardNoParam);
        Board board = service.selectBoard(boardNo);

        if(board == null) {
            request.setAttribute("errorMsg", "게시글이 존재하지 않습니다.");
            request.getRequestDispatcher("/views/common/error.jsp").forward(request, response);
            return;
        }

        request.setAttribute("board", board);
        request.getRequestDispatcher("/views/board/detailView.jsp").forward(request, response);
    }
}
