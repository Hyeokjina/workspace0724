package com.kh.example.collection1;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class MusicController {
	List<Music> list = new ArrayList<>();
	
	public MusicController() {
        list.add(new Music("Ditto", "NewJeans"));
        list.add(new Music("Love Dive", "IVE"));
        list.add(new Music("Hype Boy", "NewJeans"));
    }
	
	public int addList(Music music) {
		if(music != null) {
			list.add(music);
			return 1;
		}
		return 0;
	}
	
	public int addAtZero(Music music) {
		if(music != null) {
			list.add(0,music);
			return 1;
		}
		return 0;	
	}
	
	public List<Music> printAll() {
		return list;
	}
	
	public Music searchMusic(String title) {
		if (title == null || title.isEmpty()) return null;  // 안전 체크

	    for (Music m : list) {
	        if (title.equalsIgnoreCase(m.getTitle())) {  // 제목 일치 여부 확인
	            return m;  // 찾으면 해당 Music 반환
	        }
	    }
	    return null;  // 찾지 못하면 null 반환
	}
	
	public Music removeMusic(String title) {
		if(title == null || title.isEmpty()) return null;
		
		for(int i = 0; i < list.size(); i++) {
	        Music m = list.get(i);
	        if(title.equalsIgnoreCase(m.getTitle())) {
	            list.remove(i); // 인덱스로 삭제하면 안전
	            return m;
	        }
	    }
	    return null;
	}
	
	public Music setMusic(String title, Music music) {
		if(title == null || music == null || title.isEmpty()) return null;
		
		for(int i = 0; i < list.size(); i++) {
	        Music m = list.get(i);
	        if(title.equalsIgnoreCase(m.getTitle())) {
	           Music oldmusic = list.get(i);
	           list.set(i, music);
	           return oldmusic;
	        }
		}
		return null;
	}
	
}












































