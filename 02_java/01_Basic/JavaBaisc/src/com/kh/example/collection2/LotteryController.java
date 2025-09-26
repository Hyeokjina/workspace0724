package com.kh.example.collection2;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.TreeSet;

public class LotteryController {
	
	private HashSet<Lottery> lottery = new HashSet<>();
	private HashSet<Lottery> win = new HashSet<>();
	
	public LotteryController() {
        // 기본 디폴트 대상
        insertObject(new Lottery("홍길동", "01012345678"));
        insertObject(new Lottery("김철수", "01023456789"));
        insertObject(new Lottery("이영희", "01034567890"));
        insertObject(new Lottery("박민수", "01045678901"));
        insertObject(new Lottery("최지우", "01056789012"));
    }
	
	public boolean insertObject(Lottery l) {
		if (l == null) return false;
        return lottery.add(l);
	}
	
	public boolean deleteObject(Lottery l) {
		if (l == null) return false;
		boolean removed = lottery.remove(l);
		if ( win != null && removed) {
			win.remove(l);
		}
		return removed;
	}
	
	public HashSet<Lottery> winObject() {
		//남은 인원만 선발
		if(win.size()< 4) {
			Random rand = new Random();
			
			ArrayList<Lottery> list = new ArrayList<>();
			list.addAll(lottery);
			
			while(win.size() < 4 && win.size() != lottery.size()) {
				int index = rand.nextInt(list.size());//0~size() -1중 랜덤으로 정수추출
				win.add(list.get(index));
			}
		}

        return win;
    }

    // 4. 정렬된 당첨자 반환 (TreeSet)
    public TreeSet<Lottery> sortedWinObject() {
    	    TreeSet<Lottery> sorted = new TreeSet<>(new SortedLottery());
    	    sorted.addAll(win);
    	    return sorted;
    }

    // 5. 당첨자 검색
    public boolean searchWinner(Lottery l) {
        if (l == null) return false;
        return win.contains(l);
    }

    // 6. 전체 대상 반환 (선택)
    public HashSet<Lottery> getLottery() {
        return new HashSet<>(lottery);
    }

    // 7. 당첨자 반환 (선택)
    public HashSet<Lottery> getWin() {
        return new HashSet<>(win);
    }
}
