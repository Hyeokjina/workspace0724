package game;

import java.util.Scanner;

public class Game {
    private Player me;
    private Player enemy;
    private double probability;
    private int round;

    public Game(int starCount, char mySymbol, char enemySymbol, double probability) {
        this.me = new Player("나", starCount, mySymbol);
        this.enemy = new Player("적", starCount, enemySymbol);
        this.probability = probability;
        this.round = 1;
    }

    public void start() throws InterruptedException {
        Scanner sc = new Scanner(System.in);

        while (me.isAlive() && enemy.isAlive()) {
            System.out.printf("==== %d턴 ====%n", round);

            boolean myAttack = me.attack(enemy, probability);
            System.out.print("내 공격 " + (myAttack ? "성공!" : "실패!") + " → ");
            enemy.printStars();

            boolean enemyAttack = enemy.attack(me, probability);
            System.out.print("적 공격 " + (enemyAttack ? "성공!" : "실패!") + " → ");
            me.printStars();

            round++;
            Thread.sleep(1000);
        }

        printResult();
    }

    private void printResult() {
        if (!me.isAlive() && !enemy.isAlive()) {
            System.out.println("나와 적이 동시에 쓰러졌다!");
        } else if (!enemy.isAlive()) {
            System.out.println("적이 쓰러졌다! 나의 승리!");
        } else {
            System.out.println("눈앞이 어두워졌다… 나의 패배!");
        }
    }
}
