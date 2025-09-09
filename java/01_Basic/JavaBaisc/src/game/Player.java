package game;

public class Player {
    private String name;
    private StarGauge gauge;

    public Player(String name, int starCount, char symbol) {
        this.name = name;
        this.gauge = new StarGauge(starCount, symbol);
    }

    public boolean attack(Player target, double probability) {
        boolean success = Math.random() < probability;
        if (success) target.gauge.removeStar();
        return success;
    }

    public boolean isAlive() {
        return !gauge.isEmpty();
    }

    public void printStars() {
        System.out.print(name + ": ");
        gauge.printStarsInline();
    }

    public String getName() {
        return name;
    }
}
