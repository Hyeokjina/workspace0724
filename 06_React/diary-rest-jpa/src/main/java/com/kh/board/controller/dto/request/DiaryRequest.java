package com.kh.board.controller.dto.request;

import lombok.Getter;
import lombok.Setter;

public class DiaryRequest {

    @Getter
    @Setter
    public static class Create {
        private Long memberId;
        private String title;
        private String content;
        private String emotion;
    }

    @Getter
    @Setter
    public static class Update {
        private String title;
        private String content;
        private String emotion;
    }
}
