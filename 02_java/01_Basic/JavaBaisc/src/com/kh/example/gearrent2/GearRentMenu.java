package com.kh.example.gearrent2;

import java.time.LocalDate;
import java.util.Scanner;

public class GearRentMenu {
    private Scanner sc = new Scanner(System.in);
    private GearController gc = new GearController();

    public void mainMenu() {
        while (true) {
            System.out.println("=== Kh 장비 대여 관리 ===");
            System.out.println("1) 장비 등록  2) 회원 등록  3) 대여  4) 반납  5) 태그 검색");
            System.out.println("6) 키워드 검색  7) 전체 장비 조회  8) 대여중 목록 조회  9) 종료");
            System.out.print("메뉴: ");
            int menu = Integer.parseInt(sc.nextLine());

            switch (menu) {
                case 1: addDevice(); break;
                case 2: addMember(); break;
                case 3: borrow(); break;
                case 4: returnItem(); break;
                case 7: gc.printAllDevices(); break;
                case 8: gc.printAllLoans(); break;
                case 9: System.out.println("종료"); return;
                default: System.out.println("잘못된 입력");
            }
        }
    }

    private void addDevice() {
        System.out.print("장비ID: ");
        String id = sc.nextLine();
        System.out.print("이름: ");
        String name = sc.nextLine();
        System.out.print("카테고리: ");
        String category = sc.nextLine();

        System.out.print("장비 유형(1:카메라, 2:노트북): ");
        int type = Integer.parseInt(sc.nextLine());

        Device device = null;
        if (type == 1) {
            device = new Camera(id, name, category);
        } else if (type == 2) {
            device = new Laptop(id, name, category);
        }

        if (device != null && gc.addDevice(device)) {
            System.out.println("등록 완료");
        } else {
            System.out.println("등록 실패(중복 ID)");
        }
    }

    private void addMember() {
        System.out.print("member id: ");
        String id = sc.nextLine();
        System.out.print("name: ");
        String name = sc.nextLine();

        Member member = new Member(id, name);
        if (gc.addMember(member)) {
            System.out.println("가입 완료");
        } else {
            System.out.println("중복된 ID입니다. 다시 입력해주세요.");
        }
    }

    private void borrow() {
        try {
            System.out.print("memberID: ");
            String memberId = sc.nextLine();
            System.out.print("itemId: ");
            String itemId = sc.nextLine();
            System.out.print("대여일(YYYY-MM-DD): ");
            LocalDate today = LocalDate.parse(sc.nextLine());

            Loan loan = gc.borrow(memberId, itemId, today);
            if (loan != null) {
                System.out.println("대여 완료: " + loan);
                System.out.println("반납 예정일: " + loan.getDueDate());
            } else {
                System.out.println("회원/장비 확인 또는 이미 대여중");
            }
        } catch (Exception e) {
            System.out.println("입력 오류: " + e.getMessage());
        }
    }

    private void returnItem() {
        System.out.print("반납할 itemId: ");
        String itemId = sc.nextLine();
        if (gc.returnDevice(itemId)) {
            System.out.println("반납 완료");
        } else {
            System.out.println("반납 실패(없는 장비 또는 대여중 아님)");
        }
    }
}