package com.kh.spring.filter;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.IOException;

/*
    요청~응답까지의 시간을 측정하는 필터
    모든 HTTP요청에 대해 처리
 */

@Slf4j
@Component
public class RequestTimeFilter implements Filter {

    //private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(RequestTimeFilter.class); ->@Slf4j 어노테이션을 작성시 lombok이 자동으로 생성된다.

    //해당 필터에서 사용할 로직을 작성하는 메서드
    //해당메서드는 DispatcherServlet 호출 전에 실행됨.
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        // HttpServletRequest / HttpServletResponse로 캐스팅
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        // 요청 시작 시간 기록
        long startTime = System.currentTimeMillis();

        // 요청 정보 출력
        String method = httpRequest.getMethod();
        String uri = httpRequest.getRequestURI();
        System.out.println("[RequestTimeFilter] 요청 시작: " + method + " " + uri);

        // 다음 필터나 서블릿으로 요청 전달
        chain.doFilter(request, response);

        // 응답 후 경과 시간 계산
        long endTime = System.currentTimeMillis();
        long duration = endTime - startTime;

        System.out.println("[RequestTimeFilter] 요청 종료: " + method + " " + uri + " (" + duration + "ms)");
    }
}