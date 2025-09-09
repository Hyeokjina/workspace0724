package com.kh.example.gearrent;

import java.util.Set;

public class Camera extends Device {
	public Camera(String id, String name, String category, Set<String> tags) {
        super(id, name, category, tags); 

    }

	@Override
	public int getBorrowLimitDays() {
		// TODO Auto-generated method stub
		return 7;
	}

	@Override
	public int calcLateFee(int overdueDays) {
		// TODO Auto-generated method stub
		return 300*overdueDays;
	}
	
	

}
