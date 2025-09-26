package com.kh.example.collection3;

import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;

public class MemberController {
	HashMap<String, Member> map = new HashMap<>();
	
	public boolean joinMembership(String id, Member m) {
		if (map.containsKey(id)) {
			return false;
		}
		map.put(id, m);
		return true;
	}
	
	public String logIn(String id, String password) {
            Member m = map.get(id);
            if (m != null && m.getPassword().equals(password)) {
                return m.getName(); 
            }
        return null; 
    }
	
	public boolean changePassword(String id, String oldPw, String newPw) {
			 Member m = map.get(id);
			 
			 if(m != null && m.getPassword().equals(oldPw)) {
				 m.setPassword(newPw);
				 return true;
	}
	return false;
	}
	
	 public void changeName(String id, String newName) {
		 if (map.containsKey(id)) {
			 Member m = map.get(id);
			 m.setName(newName);
		 }     
	 }
	 
	 public TreeMap<String, String> sameName(String name) {
		 TreeMap<String, String> result = new TreeMap<>(); // 결과를 담을 TreeMap
		    
		    // map의 모든 회원 확인
		    for (Map.Entry<String, Member> entry : map.entrySet()) {
		        String id = entry.getKey();
		        Member m = entry.getValue();
		        
		        if (m.getName().equals(name)) {
		            result.put(id, m.getName()); // id와 이름 저장
		        }
		    }
		    
		    return result;
		}
	
	 
}
