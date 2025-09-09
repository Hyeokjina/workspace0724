package com.kh.inherit;

public class Man {
    private String name;

    public Man(String name) {
        this.name = name;
        System.out.println("Man에 Man을 포함한 생성자");
    }

    public void tellYourName() {
        System.out.println("My name is " + name);
    }
}

