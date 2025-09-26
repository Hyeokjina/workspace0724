package game;

public class StarGauge {
    private int stars;
    private char symbol; // 별/해시 기호 구분

    public StarGauge(int stars, char symbol) {
        this.stars = stars;
        this.symbol = symbol;
    }

    public void removeStar() {
        if (stars > 0) stars--;
    }

    public void printStars() {
        for (int i = 0; i < stars; i++) {
            System.out.print(symbol);
        }
        System.out.println();
    }

    public boolean isEmpty() {
        return stars == 0;
    }

    public int getStars() {
        return stars;
    }
    public void printStarsInline() {
        for (int i = 0; i < stars; i++) System.out.print(symbol);
        System.out.println();
    }
}
