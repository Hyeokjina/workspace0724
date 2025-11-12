package com.kh.spring.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

public class ToiletService {

        @Value("${seoul.api.key}")
        private  String apiKey;

        private static final String API_URL = "http://openapi.seoul.go.kr:8088";

    public void getToileList(int start , int end) {

        String url = String.format("%s/%s/json/mgisToiletPio/%d/%d", API_URL, apikey, start, end);
        //http://openapi.seoul.go.kr:8088/6c787557716c736838374773514157/json/mgisToiletPoi/1/5/

        log.info("url : {}", url);

        RestTemplate restTemplate = new RestTemplate();
        String jsonResponse = restTemplate.getForObject(url, String.class);
    }
}
