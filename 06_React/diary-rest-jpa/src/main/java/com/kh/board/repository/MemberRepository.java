package com.kh.board.repository;

import com.kh.board.entity.Member;

import java.util.List;
import java.util.Optional;

public interface MemberRepository {
    void save(Member member);
    List<Member> findAll();
    Optional<Member> findById(Long id);
    Optional<Member> findByEmail(String email);
    void delete(Member member);
}
