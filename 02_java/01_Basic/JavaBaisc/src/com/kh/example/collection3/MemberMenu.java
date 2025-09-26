package com.kh.example.collection3;

import java.util.Map;
import java.util.Scanner;
import java.util.TreeMap;

public class MemberMenu {
    private MemberController mc = new MemberController();
    private Scanner sc = new Scanner(System.in);

    // 메인 메뉴
    public void mainMenu() {
        while (true) {
            System.out.println("\n========== KH 사이트 ========== ");
            System.out.println("=====***** 메인 메뉴 *****===== ");
            System.out.println("1. 회원가입 ");
            System.out.println("2. 로그인  ");
            System.out.println("3. 같은 이름 회원 찾기");
            System.out.println("9. 종료 ");
            System.out.print("메뉴 번호 입력 : ");

            int num;
            try {
                num = Integer.parseInt(sc.nextLine());
            } catch (Exception e) {
                System.out.println("잘못된 입력입니다.");
                continue;
            }

            switch (num) {
                case 1:
                    joinMembership();
                    break;
                case 2:
                    logIn();
                    break;
                case 3:
                    sameName();
                    break;
                case 9:
                    System.out.println("프로그램 종료");
                    return;
                default:
                    System.out.println("잘못 입력하셨습니다.");
            }
        }
    }

    // 회원가입
    public void joinMembership() {
        System.out.print("아이디: ");
        String id = sc.nextLine();

        System.out.print("비밀번호: ");
        String pw = sc.nextLine();

        System.out.print("이름: ");
        String name = sc.nextLine();

        boolean result = mc.joinMembership(id, new Member(pw, name));
        if (result) {
            System.out.println("성공적으로 회원가입 완료하였습니다.");
        } else {
            System.out.println("회원가입에 실패했습니다. 이미 존재하는 아이디입니다.");
        }
    }

    // 로그인
    public void logIn() {
        System.out.print("아이디: ");
        String id = sc.nextLine();

        System.out.print("비밀번호: ");
        String pw = sc.nextLine();

        String name = mc.logIn(id, pw);
        if (name == null) {
            System.out.println("틀린 아이디 또는 비밀번호입니다.");
        } else {
            System.out.println(name + "님 환영합니다!");
            memberMenu(id); // 로그인 성공 → 회원 메뉴
        }
    }

    // 로그인 후 회원 메뉴
    public void memberMenu(String id) {
        while (true) {
            System.out.println("\n******* 회원 메뉴 *******");
            System.out.println("1. 비밀번호 바꾸기");
            System.out.println("2. 이름 바꾸기");
            System.out.println("3. 로그아웃");
            System.out.print("메뉴 번호 입력 : ");

            int num;
            try {
                num = Integer.parseInt(sc.nextLine());
            } catch (Exception e) {
                System.out.println("잘못된 입력입니다.");
                continue;
            }

            switch (num) {
                case 1:
                    changePassword(id);
                    break;
                case 2:
                    changeName(id);
                    break;
                case 3:
                    System.out.println("로그아웃 되었습니다.");
                    return;
                default:
                    System.out.println("잘못 입력하셨습니다.");
            }
        }
    }

    // 비밀번호 변경
    public void changePassword(String id) {
        System.out.print("현재 비밀번호: ");
        String oldPw = sc.nextLine();

        System.out.print("새 비밀번호: ");
        String newPw = sc.nextLine();

        boolean result = mc.changePassword(id, oldPw, newPw);
        if (result) {
            System.out.println("비밀번호가 성공적으로 변경되었습니다.");
        } else {
            System.out.println("비밀번호 변경에 실패했습니다. 현재 비밀번호를 확인하세요.");
        }
    }

    // 이름 변경
    public void changeName(String id) {
        System.out.print("현재 비밀번호 확인: ");
        String pw = sc.nextLine();

        String currentName = mc.logIn(id, pw);
        if (currentName == null) {
            System.out.println("비밀번호가 틀렸습니다. 이름 변경 실패.");
            return;
        }

        System.out.println("현재 이름: " + currentName);
        System.out.print("변경할 이름: ");
        String newName = sc.nextLine();

        mc.changeName(id, newName);
        System.out.println("이름 변경에 성공했습니다.");
    }

    // 같은 이름 회원 찾기
    public void sameName() {
        System.out.print("검색할 이름: ");
        String name = sc.nextLine();

        TreeMap<String, String> sameMembers = mc.sameName(name);

        if (sameMembers.isEmpty()) {
            System.out.println("동일 이름의 회원이 없습니다.");
        } else {
            System.out.println("=== 같은 이름 회원 목록 ===");
            for (Map.Entry<String, String> entry : sameMembers.entrySet()) {
                System.out.println("이름: " + entry.getValue() + ", 아이디: " + entry.getKey());
            }
        }
    }
}
