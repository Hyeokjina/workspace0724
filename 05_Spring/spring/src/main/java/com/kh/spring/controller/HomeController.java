package com.kh.spring.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class HomeController {

    @RequestMapping("/")
    public String home(@RequestParam(value = "cpage", defaultValue = "1") int currentPage) {
        //공중화징실 목록을 받아서 페이지에 전달
        //http://openapi.seoul.go.kr:8088/인증키/응답형식/mgisToiletPoi/시작인덱스/끝인덱스/
        //http://openapi.seoul.go.kr:8088/6c787557716c736838374773514157/json/mgisToiletPoi/1/5/

        //PageInfo를 사용해서 페이징 처리

        int itemLimit = 10; //한페이지에 보여줄 화장실 갯수
        int pageLimit = 5; //페이징 버튼 갯수

        int startIndex = ( currentPage- 1) * itemLimit + 1;
        int  endIndex = startIndex + itemLimit -1;


        return "index";

    }
}
