package com.kh.example.collection1;

public class AscTitle {
	public int compare (Music o1, Music o2) {
		int result = o1.getTitle().compareTo(o2.getTitle());
		
		if(result == 0) {
			result = o1.getSinger().compareTo(o2.getSinger()); 
		}
		return result;
	}
}
