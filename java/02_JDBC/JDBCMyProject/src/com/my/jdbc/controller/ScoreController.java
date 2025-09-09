package com.my.jdbc.controller;

import java.util.List;
import com.my.jdbc.service.ScoreService;
import com.my.jdbc.view.GameUserMenu;

public class ScoreController {

    private ScoreService service = new ScoreService();
    private GameUserMenu menu = new GameUserMenu();

    // 최고 점수 저장 + 메시지 출력
    public void saveHighScore(String userId, int score) {
        int result = service.saveHighScore(userId, score);//위임
        switch(result) {
            case 0:
                menu.displayFail("최고점수보다 낮음. 기록하지 않음.");
                break;
            case 1:
                menu.displaySuccess("최고점수 갱신 완료!");
                break;
            case 2:
                menu.displaySuccess("최초 점수 기록 완료!");
                break;
            default:
                menu.displayFail("점수 저장 중 오류가 발생했습니다.");
        }
    }

    // 전체 랭킹 조회
    public void showRanking() {
        List<String> ranking = service.getAllScores();
        if (ranking.isEmpty()) {
            menu.displayFail("랭킹 정보가 없습니다.");
        } else {
            menu.displayList(ranking, "전체 랭킹");
        }
    }
    
    
}
