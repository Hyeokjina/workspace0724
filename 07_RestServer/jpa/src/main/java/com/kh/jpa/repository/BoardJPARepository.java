package com.kh.jpa.repository;

import com.kh.jpa.entity.Board;
import com.kh.jpa.entity.Member;
import com.kh.jpa.enums.CommonEnums;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

// JpaRepository를 상속받아 기본 CRUD메서드를 자동으로 제공받을 수 있음
// save(Board b) - 저장
// findById(Long id) - id(pk)로 조회
// findAll() - 전체조회
// delete(Board b) - 삭제
// count() - 개수조회
// existsById(Long id) - 존재여부

// Query Method: 메서드 이름 규칙에 따라 자동으로 쿼리 생성
// findByStatus - status 필드로 검색
public interface BoardJPARepository extends JpaRepository<Board, Long> {
    // SELECT * FROM board WHERE status = ? ORDER BY create_date DESC
    // Pageable을 추가하면 페이징 처리된 결과 반환

    //상태값을 통한 게시글 조회
    Page<Board> findByStatus(CommonEnums.Status status, Pageable pageable);

    //작성자로 게시글 조회
    List<Board> findByMember(Member member);

    //작성자로 아이디로 조회
    List<Board> findByMemberUserId(String userId);

    //제목 또는 내용으로 게시글 검색
    List<Board> findByBoardTitleContainingOrBoardContent(String title, String content);

    //조회수가 놓은 순으로 게시글 조회
    List<Board> findByOrderByCountDesc();

    //특정 작성자의 확성 게시글 조회(페이징) -> JPQL로
    @Query("select b from Board b where b.member.userId = :userId and b.status = :status")
    List<Board> findByMemberAndStatus(@Param("userId") String userId, @Param("status") CommonEnums.Status status);

    //특정태그를 가진 게시그 조회
    @Query("select b from Board b" +
            "join b.boarddTags bt" +
            "join bt.tag t" +
            "where t.tagName = :tagName and b.status = :status")
    Page<Board> findByTagName(@Param("tagname") String tagName,
                              @Param("status") CommonEnums.Status status,
                              Pageable pageable);


}
