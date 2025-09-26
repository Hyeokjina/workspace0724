package com.my.jdbc.game;

import java.util.Scanner;

public class AdminAdjustment {
    private static int timeLimit = 20;  // 기본값
    private static int numLength = 5;   // 기본값

    // 설정 메뉴
    public static void adjustSettings() {
        Scanner sc = new Scanner(System.in);

        System.out.print("제한 시간을 입력하세요(기본값 " + timeLimit + "): ");
        String inputTime = sc.nextLine();
        if (!inputTime.trim().isEmpty()) {
            timeLimit = Integer.parseInt(inputTime);
        }

        System.out.print("문자열 길이를 입력하세요(기본값 " + numLength + "): ");
        String inputLength = sc.nextLine();
        if (!inputLength.trim().isEmpty()) {
            numLength = Integer.parseInt(inputLength);
        }

        System.out.println("설정이 저장되었습니다! (제한시간: " + timeLimit + "초, 문자열 길이: " + numLength + ")");
    }

    public static int getTimeLimit() {
        return timeLimit;
    }

    public static int getNumLength() {
        return numLength;
    }
}
