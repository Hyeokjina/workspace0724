package com.kh.example.poly1;

public class AnimalManager {

	public static void main(String[] args) {
		Animal[] animals = new Animal[5];
		
		animals[0] = new Dog("바둑이", 3, "진돗개");
        animals[1] = new Cat("나비", 2, "검정색");
        animals[2] = new Dog("초코", 4, "삽살개");
        animals[3] = new Dog("흰둥이", 1, "진돗개");
        animals[4] = new Cat("하양이", 5, "흰색");
        
        for(Animal a : animals) {
        	a.speak();
        
        if (a instanceof Dog) {
            String breed = ((Dog)a).getBreed();
            System.out.println("이 개의 견종은 " + breed+ "입니다.");
        } else if (a instanceof Cat) {
        	String color = ((Cat)a).getColor();
            System.out.println("이 고양이의 색상은 " + color + "입니다.");
        }
        System.out.println();
        
        }

	}

}
