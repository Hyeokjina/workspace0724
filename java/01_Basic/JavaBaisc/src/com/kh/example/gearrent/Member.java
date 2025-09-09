package com.kh.example.gearrent;

public class Member {
    private String id;
    private String name;

    public Member() {}
    public Member(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public String getId() {
    	return id; 
    }
    
    public String getName() { return name; 
    }
    
    public void setName(String name) {
    	this.name = name; 
    }

    @Override
    public int hashCode() {
    	return id.hashCode();
    }

    @Override
    public boolean equals(Object o) {
        return (o instanceof Member m) && id.equals(m.id);
    }

    @Override
    public String toString() {
        return id + " | " + name;
    }
}
