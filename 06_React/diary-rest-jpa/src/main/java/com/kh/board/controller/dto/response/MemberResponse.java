package com.kh.board.controller.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class MemberResponse {
    private Long id;
    private String email;
    private String nickname;
    private LocalDateTime createdAt;

    public static MemberResponse of(Long id, String email, String nickname, LocalDateTime createdAt) {
        return new MemberResponse(id, email, nickname, createdAt);
    }
}
