package com.kh.jsp.model.vo;

import java.sql.Date;

public class Board {
    private int boardNo;
    private String boardTitle;
    private String boardContent;
    private int boardWriter;
    private Date createDate;
    private int categoryNo;
    private int boardType;
    private int readCount; // BOARD.COUNT 컬럼과 매핑
    private String boardWriterName; // 작성자 이름
    private String categoryName;    // 카테고리 이름

    public Board() {}

    // Getter / Setter
    public int getBoardNo() { return boardNo; }
    public void setBoardNo(int boardNo) { this.boardNo = boardNo; }

    public String getBoardTitle() { return boardTitle; }
    public void setBoardTitle(String boardTitle) { this.boardTitle = boardTitle; }

    public String getBoardContent() { return boardContent; }
    public void setBoardContent(String boardContent) { this.boardContent = boardContent; }

    public int getBoardWriter() { return boardWriter; }
    public void setBoardWriter(int boardWriter) { this.boardWriter = boardWriter; }

    public Date getCreateDate() { return createDate; }
    public void setCreateDate(Date createDate) { this.createDate = createDate; }

    public int getCategoryNo() { return categoryNo; }
    public void setCategoryNo(int categoryNo) { this.categoryNo = categoryNo; }

    public int getBoardType() { return boardType; }
    public void setBoardType(int boardType) { this.boardType = boardType; }

    public int getReadCount() { return readCount; }
    public void setReadCount(int readCount) { this.readCount = readCount; }

    public String getBoardWriterName() { return boardWriterName; }
    public void setBoardWriterName(String boardWriterName) { this.boardWriterName = boardWriterName; }

    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }
}
