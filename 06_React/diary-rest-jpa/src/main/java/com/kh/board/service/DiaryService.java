package com.kh.board.service;

import com.kh.board.controller.dto.request.DiaryRequest;
import com.kh.board.controller.dto.response.DiaryResponse;

import java.util.List;

public interface DiaryService {
    List<DiaryResponse> findAll();
    List<DiaryResponse> findByMemberId(Long memberId);
    DiaryResponse findById(Long id);
    void save(DiaryRequest.Create createDto);
    void updateById(Long id, DiaryRequest.Update updateDto);
    void deleteById(Long id);
}