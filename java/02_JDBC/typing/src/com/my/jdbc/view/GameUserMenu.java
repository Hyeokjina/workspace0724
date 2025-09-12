package com.my.jdbc.view;

import java.util.List;
import java.util.Scanner;

import com.my.jdbc.controller.ScoreController;
import com.my.jdbc.controller.UserController;
import com.my.jdbc.game.AdminAdjustment;
import com.my.jdbc.game.PlayGame;
import com.my.jdbc.game.Rule;
import com.my.jdbc.model.dao.ScoreDao;
import com.my.jdbc.model.vo.User;


public class GameUserMenu {
    private Scanner sc = new Scanner(System.in);
    private UserController uc = new UserController();
    private User loginUser;
    private ScoreDao sd = new ScoreDao();
		public GameUserMenu() {
		    super();
		}
		
		//초기화면
		public void mainMenu() {
			while(true) {
				System.out.println("============ Typing Test ============");
				System.out.println("1. 로그인");
				System.out.println("2. 회원 가입");
				System.out.println("3. 관리자 ");
				System.out.println("9. 프로그램 종료");
				
				System.out.print("메뉴 입력 : ");
				int sel = sc.nextInt();
				sc.nextLine();
				
				switch(sel) {
					case 1: login(); break;
					case 2: insertMember(); break;
					case 3: adminCheak();	break;
					case 9: 
							System.out.println("프로그램을 종료합니다.");
						return;
					default: System.out.println("잘못 입력하셨습니다. ");
				}
				
				System.out.println();
			}
		}
		
		//로그인
		public void login() {
		    System.out.println("========= 로그인 ===========");
		    
		    System.out.print("아이디 : ");
		    String userId = sc.nextLine();
		    
		    System.out.print("비밀번호 : ");
		    String userPwd = sc.nextLine();
		    
		    User loginUser = uc.login(userId, userPwd);
		    
		    if(loginUser != null) {
		    	this.loginUser = loginUser;
		        System.out.println("로그인 성공! 게임 메뉴로 이동합니다.");
		        gameMenu();
		    } else {
		        System.out.println("아이디 또는 비밀번호가 올바르지 않습니다.");
		    }
		    
		}  
		
		
		//회원 가입
		public void insertMember() {
			System.out.println("========= 회원 추가 ===========");
			
			System.out.print("아이디 : ");
			String userId = sc.nextLine();
			
			System.out.print("비밀번호 : ");
			String userPwd = sc.nextLine();
			
			System.out.print("이름 : ");
			String userName = sc.nextLine();
			
			System.out.print("성별(M,F) : ");
			String gender = sc.nextLine();
			
			System.out.print("나이 : ");
			String age = sc.nextLine();
			
			System.out.print("이메일 : ");
			String email = sc.nextLine();
			
			System.out.print("전화번호(-제외) : ");
			String phone = sc.nextLine();
			
			uc.insertMember(userId, userPwd, userName, gender, age, email, phone);
		}
		
		//관리자 키 체크
		public void adminCheak() {
			System.out.print("관리자키 번호를 입력하세요 : ");
			 int adminNum = 777;
			 int inputNum = sc.nextInt();
			 
			 switch(inputNum) {
			 case 777:
				 System.out.println("인증 성공! 관리자 메뉴로 넘어갑니다.");
				 System.out.println();
				 adminMenu();
				 break;
			 default :
				 System.out.println("키 번호가 틀렸습니다. 다시 입력하세요.");
				 System.out.println();
				 mainMenu();
				 return;
			 }
		 }
		
		
		//로그인 후 화면
		public void gameMenu() {
			while(true) {
				System.out.println("============ 게임 메뉴 ============");
				System.out.println("1. 게임시작");
				System.out.println("2. 게임방법");
				System.out.println("3. 스테이지 랭킹 보기");
				System.out.println("4. 내 정보 변경");			
				System.out.println("5. 회원 탈퇴");
				System.out.println("6. 초기화면으로 돌아가기");
				
				System.out.print("메뉴 입력 : ");
				int sel = sc.nextInt();
				sc.nextLine();
				
				switch(sel) {
					case 1: gameStart(); break;
					case 2: gameRules(); break;
					case 3:	gameRank(); break;
					case 4: updateUser(); break;
					case 5: deleteUser(); break;
					case 6: mainMenu(); break;
					
					
					default: System.out.println("잘못 입력하셨습니다. ");
				}
				
				System.out.println();
			}
		}
	
		
		//관리자 메뉴
		public void adminMenu() {
			while(true) {
				System.out.println("============ 관리자 메뉴 ============");
				System.out.println("1. 전체 회원가입 정보 확인");
				System.out.println("2. 아이디 회원 정보 찾기");
				System.out.println("3. 난이도 조절하기");
				System.out.println("4. 초기화면으로 돌아가기");
				
				System.out.print("메뉴 입력 : ");
				int sel = sc.nextInt();
				sc.nextLine();
				
				switch(sel) {
					case 1: uc.selectUserAll();   break;
					case 2: selectUser(); break;
					case 3: adminAdjustment(); break;
					case 6: adminAdjustment(); break;
					case 4: mainMenu(); break;
					default: System.out.println("잘못 입력하셨습니다. ");
				}
				
				System.out.println();
			}
		}
		
		//게임시작
		public void gameStart() {
			PlayGame playGame = new PlayGame(loginUser.getUserId()); 
		    playGame.start();
		}
		
		//게임 방법
		public void gameRules() {
			Rule rule = new Rule();
		    rule.gameRules();
		    gameMenu();
		}
		
		public void gameRank() {
		    ScoreController sc = new ScoreController();
		    sc.showRanking();
		}
		
		//회원 정보 변경
		public void updateUser() {
			System.out.println("========= 내 정보 변경 ===========");
			
			System.out.print("현재 아이디 입력 :");
			String userId = sc.nextLine(); 
			
			System.out.print("현재 비밀번호 입력 :");
			String userPwd = sc.nextLine(); 
			
			System.out.print("변경할 이름 입력 :");
			String userName = sc.nextLine();
			
			System.out.print("변경할 성별 입력 :");
			String gender = sc.nextLine();
			
			System.out.print("변경할 나이 입력 :");
			int age = sc.nextInt();
			sc.nextLine();
		
			System.out.print("변경할 이메일 : ");
			String email = sc.nextLine();
			
			System.out.print("변경할 전화번호(-제외) : ");
			String phone = sc.nextLine();
		
			uc.updateUser(userId, userPwd, userName, gender, age, email, phone);
		}
		
		
		//회원 탈퇴
		public void deleteUser() {
			System.out.println("========= 회원 정보 삭제 ===========");
			System.out.print("정보를 삭제할 아이디 :");
			String userId = sc.nextLine();
			
			System.out.print("비밀번호 확인 :");
			String userPwd = sc.nextLine();
			
			uc.deleteUser(userId, userPwd);
			mainMenu();
		}
			
		//유저 찾기
		public void selectUser() {
			System.out.println("========= 회원 정보 찾기 ===========");
			System.out.print("유저 아이디 입력 : ");
			String userId = sc.nextLine();
			
			uc.selectUserById(userId);
		}
		
		
		public void adminAdjustment() {
			AdminAdjustment.adjustSettings();
		}
		
		
		public void displaySuccess(String msg) {
			System.out.println("\n서비스 요청 성공 : " + msg);
		}
		
		public void displayFail(String msg) {
			System.out.println("\n서비스 요청 실패 : " + msg);
		}
		
		
		public void displayList(List list, String title) {
			System.out.println("========== " + title + " ==========");
			for(Object o : list) {
				System.out.println(o);
			}
		}
}

