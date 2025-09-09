package com.kh.example.collection1;

import java.util.Objects;

public class Music {
	String title;	//곡명
	String singer;	//가수명
	
	public Music() {
		super();
	}

	public Music(String title, String singer) {
		super();
		this.title = title;
		this.singer = singer;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getSinger() {
		return singer;
	}

	public void setSinger(String singer) {
		this.singer = singer;
	}

	@Override
	public String toString() {
		return " 곡명 : " + title + " - 가수명 : " + singer ;
	}

	@Override
	public int hashCode() {
	    return Objects.hash(title, singer);
	}

	@Override
	public boolean equals(Object obj) {
	    if (this == obj) return true;
	    if (obj == null || getClass() != obj.getClass()) return false;

	    Music music = (Music) obj;
	    return Objects.equals(title, music.title) &&
	           Objects.equals(singer, music.singer);
	}
	
	public int compareTo (Music o) {
	    int result = this.title.compareTo(o.title); // 제목 기준 오름차순
	    if (result == 0) {
	        result = this.singer.compareTo(o.singer); // 제목 같으면 가수 기준 오름차순
	    }
	    return result;
	}


	
	
	
	
	
	
	
}
