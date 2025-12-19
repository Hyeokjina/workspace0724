package com.kh.board.controller.dto.request;

import lombok.Getter;
import lombok.Setter;

public class MemberRequest {

    @Getter
    @Setter
    public static class Signup {
        private String email;
        private String password;
        private String nickname;
    }

    @Getter
    @Setter
    public static class Login {
        private String email;
        private String password;
    }
}
