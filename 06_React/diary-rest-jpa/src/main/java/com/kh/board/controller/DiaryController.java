package com.kh.board.controller;

import com.kh.board.controller.dto.request.DiaryRequest;
import com.kh.board.controller.dto.response.ApiResponse;
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
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ApiResponse(true, "일기 조회 성공", diary));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage(), null));
        }
    }

    @PostMapping
    public ResponseEntity<?> createDiary(@RequestBody DiaryRequest.Create request) {
        try {
            diaryService.save(request);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse(true, "일기 작성 성공", null));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, e.getMessage(), null));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateDiary(@PathVariable Long id, @RequestBody DiaryRequest.Update request) {
        try {
            diaryService.updateById(id, request);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ApiResponse(true, "일기 수정 성공", null));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage(), null));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDiary(@PathVariable Long id) {
        try {
            diaryService.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ApiResponse(true, "일기 삭제 성공", null));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage(), null));
        }
    }
}
