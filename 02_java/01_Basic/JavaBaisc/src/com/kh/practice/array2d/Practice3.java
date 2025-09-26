package com.kh.practice.array2d;

import java.util.Scanner;

public class Practice3 {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);

        boolean[][] paper = new boolean[100][100]; // 도화지: false(빈칸), true(색종이 붙음)

        int n = sc.nextInt(); // 색종이 수

        for (int k = 0; k < n; k++) {
            int x = sc.nextInt(); // 왼쪽 변과 도화지 왼쪽 변 사이 거리
            int y = sc.nextInt(); // 아래쪽 변과 도화지 아래쪽 변 사이 거리

            // 색종이가 붙는 10x10 칸을 true로 표시
            for (int i = x; i < x + 10; i++) {
                for (int j = y; j < y + 10; j++) {
                    paper[i][j] = true;
                }
            }
        }

        // 넓이 계산: true인 칸 개수 세기
        int area = 0;
        for (int i = 0; i < 100; i++) {
            for (int j = 0; j < 100; j++) {
                if (paper[i][j]) {
                    area++;
                }
            }
        }

        System.out.println(area);

        sc.close();
        
        
      
    }
}
