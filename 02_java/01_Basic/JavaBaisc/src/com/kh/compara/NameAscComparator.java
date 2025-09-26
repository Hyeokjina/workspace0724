package com.kh.compara;

import java.util.Comparator;

public class NameAscComparator implements Comparator<Student>	{

	@Override
	public int compare(Student o1, Student o2) {
		return o1.score - o2.score;//오름차순
	}

	
	
	

}
