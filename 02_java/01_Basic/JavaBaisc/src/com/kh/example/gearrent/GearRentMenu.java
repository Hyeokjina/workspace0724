package com.kh.example.gearrent;

import java.time.LocalDate;
import java.util.*;

public class GearRentMenu {

    private GearRentController gc = new GearRentController();
    private Scanner sc = new Scanner(System.in);

    public void mainMenu() {
        while (true) {
            System.out.println("=== Kh 장비 대여 관리 ===");
            System.out.print("1) 장비 등록");
            System.out.print("  2) 회원 등록");
            System.out.print("  3) 대여");
            System.out.print("  4) 반납");
            System.out.println("  5) 태그 검색");
            System.out.print("6) 키워드 검색");
            System.out.print("  7) 전체 장비 조회");
            System.out.print("  8) 대여중 목록 조회");
            System.out.println("  9) 종료");
            System.out.print("메뉴: ");

            int num= sc.nextInt();
            sc.nextLine();


            switch (num) {
                case 1: addDevice(); break;
                case 2: addMember(); break;
                case 3: borrow(); break;
                case 4: returnItem(); break;
                case 5: findByTag(); break;
                case 6: findByKeyword(); break;
                case 7: printAllDevices(); break;
                case 8: printActiveLoans(); break;
                case 9:
                    System.out.println("프로그램 종료");
                    return;
                default:
                    System.out.println("잘못 입력하였습니다. 다시 입력해주세요.");
            }
        }
    }
    private void addDevice() {
        System.out.print("유형 (1: Camera, 2: Laptop): ");
        int type = sc.nextInt();
        sc.nextLine();

        System.out.print("id: ");
        String id = sc.nextLine();

        System.out.print("name: ");
        String name = sc.nextLine();

        System.out.print("Category: ");
        String category = sc.nextLine();

        System.out.print("tags(콤마로 구분): ");
        String tagInput = sc.nextLine();
        Set<String> tags = new HashSet<>();
        if (!tagInput.isEmpty()) {
            for (String t : tagInput.split(",")) {
                tags.add(t.trim());
            }
        }

        Device device = null;
        if (type == 1) {
            device = new Camera(id, name, category, tags);
        } else if (type == 2) {
            device = new Laptop(id, name, category, tags);
        }

        if (gc.addDevice(device)) {
            System.out.println("등록 완료");
        } else {
            System.out.println("중복된 ID입니다. 다시 입력해주세요.");
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
            System.out.println(e.getMessage());
        }
    }

    private void returnItem() {
        try {
            System.out.print("itemId: ");
            String itemId = sc.nextLine();
            System.out.print("반납일 (YYYY-MM-DD): ");
            LocalDate today = LocalDate.parse(sc.nextLine());

            int fee = gc.returnItem(itemId, today);
            if (fee >= 0) {
                System.out.println("반납 완료. 연체료: " + fee + "원");
            } else {
                System.out.println("반납 불가: 해당 장비 대여 기록 없음");
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }


    private void findByTag() {
        System.out.print("검색 태그: ");
        String tag = sc.nextLine();
        List<Device> list = gc.findByTag(tag);
        if (list.isEmpty()) {
            System.out.println("조회결과 없음");
        } else {
            for (Device d : list) System.out.println(d);
        }
    }

    private void findByKeyword() {
        System.out.print("키워드: ");
        String keyword = sc.nextLine();
        List<Device> list = gc.findByKeyword(keyword);
        if (list.isEmpty()) {
            System.out.println("조회 결과 없음");
        } else {
            for (Device d : list) System.out.println(d);
        }
    }
    private void printAllDevices() {
        for (Device d : gc.getAllDevices()) {
            System.out.println(d);
        }
    }

    private void printActiveLoans() {
        for (Loan l : gc.getActiveLoans()) {
            System.out.println(l);
        }
    }
}
