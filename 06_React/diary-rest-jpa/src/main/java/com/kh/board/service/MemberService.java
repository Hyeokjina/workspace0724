package com.kh.board.service;

import com.kh.board.controller.dto.request.MemberRequest;
import com.kh.board.controller.dto.response.MemberResponse;

public interface MemberService {
    void signup(MemberRequest.Signup signupDto);
    MemberResponse login(MemberRequest.Login loginDto);
    MemberResponse findById(Long id);
    MemberResponse updateById(Long id, MemberRequest.Update updateDto);
    void deleteById(Long id);
}
