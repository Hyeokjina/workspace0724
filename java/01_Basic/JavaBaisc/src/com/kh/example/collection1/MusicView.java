package com.kh.example.collection1;

import java.util.Scanner;

public class MusicView {
	Scanner sc = new Scanner(System.in);
	MusicController mc = new MusicController();
	
	public void mainMenu() {
		while(true) {
		System.out.println("=====***** 메인 메뉴 *****===== ");
		System.out.println("1. 마지막 위치에 곡 추가 ");
		System.out.println("2. 첫 위치에 곡 추가");
		System.out.println("3. 전체 곡 목록 출력 ");
		System.out.println("4. 특정 곡 검색  ");
		System.out.println("5. 특정 곡 삭제");
		System.out.println("6. 특정 곡 수정 ");
		System.out.println("7. 곡 명 오름차순 정렬");
		System.out.println("8. 가수 명 내림차순 정렬 ");
		System.out.println("9. 종료 ");
		System.out.print("메뉴 번호 입력 : ");
		int num = sc.nextInt();
		sc.nextLine();
		
		switch (num) {
	
		case 1:
			addList();
			System.out.println();
			System.out.println("--------------------");
		break;
		case 2:
			addAtZero();
			System.out.println();
			System.out.println("--------------------");
		break;
		case 3:
			printAll();
			System.out.println();
			System.out.println("--------------------");
		break;
		case 4:
			searchMusic();
			System.out.println();
			System.out.println("--------------------");
		break;
		case 5:
			removeMusic();
			System.out.println();
			System.out.println("--------------------");
		break;
		case 6:
			setMusic();
			System.out.println();
			System.out.println("--------------------");
		break;
		case 7:
			//ascTitle();
			System.out.println();
			System.out.println("--------------------");
		break;
		case 8:
			//descSinger();
			System.out.println();
			System.out.println("--------------------");
		break;
		case 9:
			System.out.println("프로그램을 종료합니다.");
		return;
		default:
            System.out.println("잘못 입력하셨습니다. 다시 선택해주세요.");
			}	
		}
	}
	
	public void addList() {
		System.out.println("****** 마지막 위치에 곡 추가 ****** ");
		System.out.print("곡명 : ");
		String title = sc.next();
		System.out.print("가수명 : ");
		String singer = sc.next();
		
		int result = mc.addList(new Music(title,singer));
		if(result == 1) {
			System.out.println("추가 성공!");
		}else {
			System.out.println("추가 실패!");
		}
	}
	
	public void addAtZero() {
		System.out.println("****** 첫 위치에 곡 추가 ****** ");
		System.out.print("곡명 : ");
		String title = sc.next();
		System.out.print("가수명 : ");
		String singer = sc.next();
		
		int result = mc.addAtZero(new Music(title,singer));
		if(result == 1) {
			System.out.println("추가 성공!");
		}else {
			System.out.println("추가 실패!");
		}
	}
	
	public void printAll() {
		System.out.println("****** 전체 곡 목록 출력 ******" );
		System.out.println(mc.printAll());
	}
	
	public void searchMusic() {
		System.out.println("****** 특정 곡 검색 ****** ");
		System.out.print("검색할 곡 명 : ");
		String title = sc.nextLine();
		Music m = mc.searchMusic(title);
	
		if(m == null) {
			System.out.println("검색한 곡이 없습니다.");
		}else {
			System.out.println("검색한 곡은 : " + m.toString() );
		}
	}
	
	public void removeMusic() {
		System.out.println("****** 특정 곡 삭제 ****** ");
		System.out.print("삭제할 곡 명 : ");
		String title = sc.nextLine();
		Music m = mc.removeMusic(title);
	
		if(m == null) {
			System.out.println("삭제할 곡이 없습니다.");
		}else {
			System.out.println(m.toString()+"을(를) 삭제했습니다." );
		}
	}
	
	public void setMusic() {
		System.out.println("****** 특정 곡 수정 ****** ");
		System.out.print("검색할 곡 명 : ");
		String oldTitle = sc.nextLine();
		System.out.print("수정할 곡 명 : ");
		String newtitle = sc.nextLine();
		System.out.print("수정할 가수 명 : ");
		String newsinger = sc.nextLine();
		
		Music m = mc.setMusic(oldTitle, new Music(newtitle,newsinger));
	
		if(m == null) {
			System.out.println("검색하신 곡이 없습니다.");
		}else {
			System.out.println(m.toString()+"가 변경되었습니다." );
		}
	}
	
	

}
