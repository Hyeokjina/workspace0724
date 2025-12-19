package com.kh.board.controller;

import com.kh.board.controller.dto.request.MemberRequest;
import com.kh.board.controller.dto.response.ApiResponse;
import com.kh.board.controller.dto.response.MemberResponse;
import com.kh.board.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/members")
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody MemberRequest.Signup request) {
        try {
            memberService.signup(request);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse(true, "회원가입 성공", null));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ApiResponse(false, e.getMessage(), null));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody MemberRequest.Login request) {
        try {
            MemberResponse response = memberService.login(request);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ApiResponse(true, "로그인 성공", response));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, e.getMessage(), null));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getMember(@PathVariable Long id) {
        try {
            MemberResponse response = memberService.findById(id);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ApiResponse(true, "회원 조회 성공", response));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage(), null));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateMember(@PathVariable Long id, @RequestBody MemberRequest.Update request) {
        try {
            MemberResponse response = memberService.updateById(id, request);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ApiResponse(true, "회원정보 수정 성공", response));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage(), null));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMember(@PathVariable Long id) {
        try {
            memberService.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ApiResponse(true, "회원 탈퇴 성공", null));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage(), null));
        }
    }
}
