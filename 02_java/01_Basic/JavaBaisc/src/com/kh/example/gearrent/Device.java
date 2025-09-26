package com.kh.example.gearrent;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

public abstract class Device {
    private String id;
    private String name;
    private String category;
    private int borrowCount;
    private Set<String> tags;

    public Device(String id, String name, String category, Set<String> tags) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.borrowCount = 0;
        if (tags == null) {
            this.tags = new HashSet<>();
        } else {
            this.tags = new HashSet<>(tags);
        }
    }

    public String getId() {
    	return id;
    }
    
    public String getName() {
    	return name; 
    }
    
    public String getCategory() { 
    	return category; 
    }
    
    public int getBorrowCount() { 
    	return borrowCount; 
    }
    
    public Set<String> getTags() {
    	return tags; 
    }

    public void setName(String name) {
    	this.name = name; 
    }
    
    public void setCategory(String category) { 
    	this.category = category;
    }
    
    public void setTags(Set<String> tags) {
    	this.tags = tags; 
    }

    public void increaseBorrowCount() {
    	borrowCount++; 
    }

    public boolean hasTag(String tag) {
        if (tag == null) return false;
        String tagName = tag.toLowerCase();
        for (String t : tags) {
            if (t.toLowerCase().equals(tagName)) return true;
        }
        return false;
    }

    @Override
    public int hashCode() {
    	return Objects.hashCode(id); 
    }

    @Override
    public boolean equals(Object o) {
        return (o instanceof Device d) && id.equals(d.id);
    }

    @Override
    public String toString() {
        return id + " | " + name + " | " + category + " | " + borrowCount + " | " + tags;
    }

    public abstract int getBorrowLimitDays();
    public abstract int calcLateFee(int overdueDays);
}
