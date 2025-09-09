package com.kh.example.gearrent2;

import java.time.LocalDate;
import java.util.*;

public class GearController {
    private Map<String, Device> catalog = new HashMap<>();
    private Map<String, Member> members = new HashMap<>();
    private Map<String, Loan> loans = new HashMap<>();

    public boolean addDevice(Device device) {
        if (device == null || catalog.containsKey(device.getId())) {
            return false;
        }
        catalog.put(device.getId(), device);
        return true;
    }

    public boolean addMember(Member member) {
        if (member == null || members.containsKey(member.getId())) {
            return false;
        }
        members.put(member.getId(), member);
        return true;
    }

    public Loan borrow(String memberId, String itemId, LocalDate today) {
        Member member = members.get(memberId);
        Device device = catalog.get(itemId);

        if (member == null || device == null || loans.containsKey(itemId)) {
            return null;
        }

        LocalDate dueDate = today.plusDays(7);
        Loan loan = new Loan(itemId, memberId, today, dueDate);
        loans.put(itemId, loan);
        return loan;
    }

    public boolean returnDevice(String itemId) {
        if (loans.containsKey(itemId)) {
            loans.remove(itemId);
            return true;
        }
        return false;
    }

    public void printAllDevices() {
        for (Device d : catalog.values()) {
            System.out.println(d);
        }
    }

    public void printAllLoans() {
        for (Loan l : loans.values()) {
            System.out.println(l);
        }
    }
}