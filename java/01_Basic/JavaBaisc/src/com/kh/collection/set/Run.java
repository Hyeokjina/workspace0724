package com.kh.collection.set;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

public class Run {
	/**
	 * Set
	 * 순서가 없고, 중복을 허용하지 않는 자료구조.
	 * index개념이 없어서 위치기반 접근(get(index))이 불가.
	 * - HashSet : 일반적인 해시알고리즘이 적용된 set
	 * - LinkedHashSet : HashSet + 순서 유지
	 * - TreeSet : 자동정렬 기능 제공
	 */

	public static void main(String[] args) {
		// 생성
		Set<Human> set = new HashSet<>();
		
		//데이터추가
		set.add(new Human("최지원",20));
		set.add(new Human("최지원",25));
		set.add(new Human("최지투",20));
		set.add(new Human("최지삼",25));
		System.out.println(set);
		new Human("최지투",20).hashCode();
		//set에 저장해서 사용하는 객체(Human)은 equlas와 hashCode를 오버라이등해줘야함
		//set은 hashCode()로 분류 후 equlas()로 비교해서 중복값을 제거함
		
		set.add(new Human("최지투",20));
		set.add(new Human("최지삼",25));
		System.out.println();//동일객체는 추가가 되지않음.
		//동일객체 : 
		
		Human h1 = new Human("최지투",20); 
		Human h2 = new Human("최지투",20); 
		
		//동일객체 :(h1.equals(h2) && h1.hashCode() == h2.hashCode())
		//객체마다의 정의된 hashCode와 eqluas의 결과가 모두 일치하는 객체
		//equlas와 hasCode를 오버라이딩 하지않으면 object의 equlas와 hasgCode를 사용함.
		//Object의 hashCode -> 주소값을 가지고 10진수형태의 해시값을 구한 것
		
		//cotains()요소의 포함여부 확인
		System.out.println("최지투가 존재? : " + set.contains(h2));
	
		//remove(E e) 요소를 통해 요소 제거 
		set.remove(h1);
		System.out.println("삭제 후 : " + set);
		System.out.println("size : " + set.size());
		
		//set의 모든 요소에 순차적으로 접근하는 방법
		//set은 index개념이 없기 때문에 get()을 사용할수 없음
		
		//1. for each
		for(Human h: set) {
			System.out.println(h);
		}
		
		//2. ArrayList에 담아서 반복 -> addAll(Collection e)
		ArrayList list = new ArrayList();
		list.addAll(set);
		for(int i=0; i<list.size(); i++) {
			System.out.println(list.get(i));
		}
		
		//3. Iterrator(반복자 인터페이스)를 활용
		//컬렉션에 저장된 요소를 순차적으로 접근하기위한 인터페이스
		//순서가 없는 set같은 자료구조를 탐색할때 반드시 필요
		//hasNext(): 다음읽을 요소가 있으면 true, 아니면 false
		Iterator<Human> it = set.iterator();
		while(it.hasNext()) {
			Human h = it.next(); //다음요소꺼내기
			System.out.println(h);
		}
	}

}





















