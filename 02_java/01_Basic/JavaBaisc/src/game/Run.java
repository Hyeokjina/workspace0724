package game;

import java.util.Scanner;

public class Run {
    public static void main(String[] args) throws InterruptedException {
        Scanner sc = new Scanner(System.in);
        System.out.print("공격 확률을 입력하세요(0~100): ");
        int num = sc.nextInt();
        double probability = num / 100.0;

        Game game = new Game(10, '*', '#', probability);
        game.start();
    }
}

