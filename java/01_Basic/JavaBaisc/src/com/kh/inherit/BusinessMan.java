
package com.kh.inherit;

public class BusinessMan extends Man {
    private String company;
    private String position;

    public BusinessMan(String name, String company, String position) {
        super(name); //자식클래스의 생성자에는 무조건 부모생성자
        this.company = company;
        this.position = position;
        System.out.println("BusinessMan 생성자");
    }

    public void tellYourInfo() {
        System.out.println("My company is " + company);
        System.out.println("My position is " + position);
        super.tellYourName(); // 부모 메서드 호출
    }
}
