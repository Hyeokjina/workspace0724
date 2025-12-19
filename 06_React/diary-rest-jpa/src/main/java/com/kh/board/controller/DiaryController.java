package com.kh.board.controller;

import com.kh.board.controller.dto.request.DiaryRequest;
import com.kh.board.controller.dto.response.DiaryResponse;
import com.kh.board.service.DiaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/diaries")
public class DiaryController {

    private final DiaryService diaryService;

    @GetMapping
    public ResponseEntity<List<DiaryResponse>> getAllDiaries() {
        List<DiaryResponse> diaries = diaryService.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(diaries);
    }

    @GetMapping("/member/{memberId}")
    public ResponseEntity<List<DiaryResponse>> getDiariesByMember(@PathVariable Long memberId) {
        List<DiaryResponse> diaries = diaryService.findByMemberId(memberId);
        return ResponseEntity.status(HttpStatus.OK).body(diaries);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDiary(@PathVariable Long id) {
        try {
            DiaryResponse diary = diaryService.findById(id);
            return ResponseEntity.status(HttpStatus.OK).body(diary);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<String> createDiary(@RequestBody DiaryRequest.Create request) {
        try {
            diaryService.save(request);
            return ResponseEntity.status(HttpStatus.CREATED).body("일기 작성 성공");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateDiary(@PathVariable Long id, @RequestBody DiaryRequest.Update request) {
        try {
            diaryService.updateById(id, request);
            return ResponseEntity.status(HttpStatus.OK).body("일기 수정 성공");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDiary(@PathVariable Long id) {
        try {
            diaryService.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body("일기 삭제 성공");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
