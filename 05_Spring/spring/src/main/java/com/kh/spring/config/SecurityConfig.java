package com.kh.spring.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration//해당객체는 설정을 위한 객체
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable);
        return http.build();
    }

    //메서드 단위로 특정객체를 만들어 반환하는 형태의 빈 등록 어노테이션이다.
    //BCryptPasswordEncoder객체를 스프링 빈에 등록하고 싶다.
    //다만 외부객체임으로 class에 직접 @conponent를 기술할 수 없어서
    //해당 객체를 만들어 반환하는 함수자체를 Bean에 등록하여 필요시 스프링이 만들어 전달 할수 있게 함.
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
