package com.kh.board.repository;

import com.kh.board.entity.Diary;

import java.util.List;
import java.util.Optional;

public interface DiaryRepository {
    Diary save(Diary diary);
    List<Diary> findAll();
    Optional<Diary> findById(Long id);
    List<Diary> findByMemberId(Long memberId);
    void delete(Diary diary);
}
