package com.kh.spring.service;

import com.kh.spring.model.vo.Member;
import org.springframework.stereotype.Service;

@Service //@Component보다 더 구체화해서 service객체에 알맞게 bean등록
public class MemberServiceImpl implements MemberService {

    @Override
    public Member loginMember(Member member) {


        return null;
    }

}