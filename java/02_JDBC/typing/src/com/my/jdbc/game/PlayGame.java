package com.my.jdbc.game;

import java.util.Random;
import java.util.Scanner;

import com.my.jdbc.controller.ScoreController;
import com.my.jdbc.model.dao.ScoreDao;

public class PlayGame {
    private String loginUserId; // 로그인한 유저 ID 저장

    // 로그인한 ID를 받아오는 생성자
    public PlayGame(String loginUserId) {
        this.loginUserId = loginUserId;
    }

    // 랜덤 문자열 생성
    public static String getRandomString(int length) {
        String m = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*/?-+";
        Random rand = new Random();
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < length; i++) {
            sb.append(m.charAt(rand.nextInt(m.length())));
        }
        return sb.toString();
    }

    // 게임 실행
    public void start() {
        Scanner sc = new Scanner(System.in);
        ScoreDao scoreDao = new ScoreDao();

        int timeLimit = AdminAdjustment.getTimeLimit();
        int numLength = AdminAdjustment.getNumLength();
        
        int stage = 1;  // 현재 단계
        boolean gameOver = false;

        while (!gameOver) {
            int numProblems = stage; // 단계에 따라 문제 개수 결정
            System.out.println("========= 단계 " + stage + " =========");
            System.out.println("제한시간: " + timeLimit + "초");
            System.out.println(numProblems + "개의 문자열을 정확히 입력하세요!");

            long stageStartTime = System.currentTimeMillis();//자바에서 현재 시간을 밀리초 단위로 반환

            for (int i = 0; i < numProblems; i++) {
                String question = getRandomString(numLength);

                boolean correct = false;
                while (!correct) {
                    long time = (System.currentTimeMillis() - stageStartTime) / 1000;
                    if (time > timeLimit) {
                        System.out.println("시간 초과! 실패");
                        gameOver = true;
                        break;
                    }

                    System.out.println("문제 " + (i + 1) + ": " + question);
                    System.out.print("입력: ");
                    String answer = sc.nextLine();

                    if (answer.equals(question)) {
                        correct = true;
                    } else {
                        System.out.println("오답! 다시 입력하세요.");
                    }
                }

                if (gameOver) break;
            }

            if (!gameOver) {
                System.out.println("단계 " + stage + " 성공!");
                stage++;
            }
        }

        System.out.println("게임 종료! 총 성공 단계: " + (stage - 1));

        // DB에 점수 저장
        ScoreController ssc = new ScoreController();
        ssc.saveHighScore(loginUserId, stage - 1);
    }
}
