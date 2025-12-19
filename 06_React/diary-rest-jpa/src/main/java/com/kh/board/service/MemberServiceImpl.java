package com.kh.board.service;

import com.kh.board.controller.dto.request.MemberRequest;
import com.kh.board.controller.dto.response.MemberResponse;
import com.kh.board.entity.Member;
import com.kh.board.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    @Override
    public void signup(MemberRequest.Signup signupDto) {
        if (memberRepository.findByEmail(signupDto.getEmail()).isPresent()) {
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        }

        Member member = Member.builder()
                .email(signupDto.getEmail())
                .password(signupDto.getPassword())
                .nickname(signupDto.getNickname())
                .build();

        memberRepository.save(member);
    }

    @Override
    public MemberResponse login(MemberRequest.Login loginDto) {
        Member member = memberRepository.findByEmail(loginDto.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 이메일입니다."));

        if (!member.getPassword().equals(loginDto.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        return MemberResponse.of(
                member.getId(),
                member.getEmail(),
                member.getNickname(),
                member.getCreatedAt()
        );
    }

    @Override
    public MemberResponse findById(Long id) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 회원을 찾을 수 없습니다."));

        return MemberResponse.of(
                member.getId(),
                member.getEmail(),
                member.getNickname(),
                member.getCreatedAt()
        );
    }

    @Override
    public MemberResponse updateById(Long id, MemberRequest.Update updateDto) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 회원을 찾을 수 없습니다."));

        // 이메일 변경 시 중복 확인
        if (updateDto.getEmail() != null && !updateDto.getEmail().equals(member.getEmail())) {
            if (memberRepository.findByEmail(updateDto.getEmail()).isPresent()) {
                throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
            }
        }

        member.updateMember(updateDto.getNickname(), updateDto.getPassword());

        return MemberResponse.of(
                member.getId(),
                member.getEmail(),
                member.getNickname(),
                member.getCreatedAt()
        );
    }

    @Override
    public void deleteById(Long id) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 회원을 찾을 수 없습니다."));

        memberRepository.delete(member);
    }
}
