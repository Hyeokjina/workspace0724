package com.my.jdbc.game;

public class Rule {
	public void gameRules() {
	    System.out.println("========= Typing Test 설명 =========");
	    System.out.println("1. 게임 목표");
	    System.out.println("   - 화면에 나타나는 무작위 문자열을 제한 시간 내에 정확히 입력하세요.");
	    System.out.println("   - 문자열은 알파벳 대/소문자와 숫자,특수문자로 구성됩니다.");
	    System.out.println();
	    System.out.println("2. 단계와 문제 수");
	    System.out.println("   - 게임은 여러 단계(Stage)로 진행됩니다.");
	    System.out.println("   - 각 단계에서는 단계 번호만큼의 문제 수가 주어집니다.");
	    System.out.println("     예: 1단계 → 1문제, 2단계 → 2문제, 3단계 → 3문제…");
	    System.out.println();
	    System.out.println("3. 문제 구성");
	    System.out.println("   - 문자열 길이는 5자리 고정(필요 시 난이도에 맞게 5~10자리로 변경 가능)");
	    System.out.println("   - 문자열은 랜덤으로 생성되며, 동일한 문제는 다시 나오지 않습니다.");
	    System.out.println();
	    System.out.println("4. 제한 시간");
	    System.out.println("   - 각 단계마다 전체 문제를 푸는 제한 시간이 20초입니다.(필요 시 시간 변경 가능)");
	    System.out.println("   - 시간 초과 시 해당 단계에서 실패하며, 게임이 종료됩니다.");
	    System.out.println();
	    System.out.println("5. 정답 및 오답 처리");
	    System.out.println("   - 정확히 입력해야 문제를 통과할 수 있습니다.");
	    System.out.println("   - 오답 입력 시 다시 입력할 수 있으며, 시간 제한 내에 정답을 입력해야 합니다.");
	    System.out.println();
	    System.out.println("6. 단계 클리어와 게임 종료");
	    System.out.println("   - 제한 시간 내 모든 문제를 정확히 입력하면 다음 단계로 넘어갑니다.");
	    System.out.println("   - 제한 시간을 초과하면 게임 종료, 총 성공 단계가 최종 점수로 기록됩니다.");
	    System.out.println("=======================================");
	    
	}

}
