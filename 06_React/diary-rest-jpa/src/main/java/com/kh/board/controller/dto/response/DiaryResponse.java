package com.kh.board.controller.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class DiaryResponse {
    private Long id;
    private Long memberId;
    private String title;
    private String content;
    private String emotion;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static DiaryResponse of(Long id, String title, String emotion, LocalDateTime createdAt) {
        return new DiaryResponse(id, null, title, null, emotion, createdAt, null);
    }

    public static DiaryResponse detail(Long id, Long memberId, String title, String content, String emotion, LocalDateTime createdAt, LocalDateTime updatedAt) {
        return new DiaryResponse(id, memberId, title, content, emotion, createdAt, updatedAt);
    }
}
