package com.kh.example.gearrent2;

public abstract class Device {
    private String id;
    private String name;
    private String category;

    public Device(String id, String name, String category) {
        this.id = id;
        this.name = name;
        this.category = category;
    }

    public String getId() { return id; }
    public String getName() { return name; }
    public String getCategory() { return category; }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "{id='" + id + "', name='" + name + "', category='" + category + "'}";
    }
}