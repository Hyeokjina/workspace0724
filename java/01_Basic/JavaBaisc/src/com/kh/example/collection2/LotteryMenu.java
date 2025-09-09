package com.kh.example.collection2;

import java.util.*;

public class LotteryMenu {
    private Scanner sc = new Scanner(System.in);
    private LotteryController lc = new LotteryController();

    public void mainMenu() {
    	System.out.println("========== KH 추첨 프로그램 ========== ");
        while (true) {
            System.out.println("=====***** 메인 메뉴 *****=====  ");
            System.out.println("1. 추첨 대상 추가");
            System.out.println("2. 추첨 대상 삭제");
            System.out.println("3. 당첨 대상 확인");
            System.out.println("4. 정렬된 당첨 대상 확인");
            System.out.println("5. 당첨자 대상 검색");
            System.out.println("9. 종료");
            System.out.print("선택 : ");
            
            int menu = sc.nextInt();
            sc.nextLine(); // 버퍼 비우기
            
            switch (menu) {
                case 1: insertObject(); break;
                case 2: deleteObject(); break;
                case 3: winObject(); break;
                case 4: sortedWinObject(); break;
                case 5: searchWinner(); break;
                case 9: 
                    System.out.println("프로그램 종료");
                    return;
                default: System.out.println("잘못 입력하셨습니다..");
            }
        }
    }

    // 1. 대상 추가
    public void insertObject() {
        System.out.print("몇 명 추가하시겠습니까? : ");
        int n = sc.nextInt();
        sc.nextLine();
        
        for (int i = 0; i < n; i++) {
            System.out.print("이름 : ");
            String name = sc.nextLine().trim();
            System.out.print("전화번호(- 없이) : ");
            String phone = sc.nextLine();
            
            boolean isInsert = lc.insertObject(new Lottery(name,phone));
            if(!isInsert) {
            	System.out.println("중복 인원입니다. 다시 입력하세요");
            	i--;
            }
        }
        System.out.println(n+ "명 추가되었습니다.");
    }

    // 2. 대상 삭제
    public void deleteObject() {
        System.out.print("삭제할 대상 이름 : ");
        String name = sc.nextLine().trim();
        System.out.print("삭제할 대상 전화번호 : ");
        String phone = sc.nextLine().trim();
        Lottery l = new Lottery(name, phone);
        
        if (lc.deleteObject(l)) {
            System.out.println("삭제 완료");
        } else {
            System.out.println("삭제할 대상이 없습니다.");
        }
    }

    // 3. 당첨자 추첨
    public void winObject() {
        HashSet<Lottery> win = lc.winObject();
        System.out.println("=== 당첨자 목록 ===");
          System.out.println(win);
        
    }

    // 4. 정렬된 당첨자 출력
    public void sortedWinObject() {
        TreeSet<Lottery> sorted = lc.sortedWinObject();
        System.out.println("=== 정렬된 당첨자 ===");
        Iterator<Lottery> it = sorted.iterator();
        while (it.hasNext()) {
            System.out.println(it.next());
        }
    }

    // 5. 당첨자 검색
    public void searchWinner() {
        System.out.print("검색할 이름 : ");
        String name = sc.nextLine().trim();
        System.out.print("검색할 전화번호 : ");
        String phone = sc.nextLine().trim();
        Lottery l = new Lottery(name, phone);

        if (lc.searchWinner(l)) {
            System.out.println("당첨자 목록에 존재합니다.");
        } else {
            System.out.println("당첨자 목록에 없습니다.");
        }
    }
}
