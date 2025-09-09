package com.kh.example.gearrent;

import java.time.LocalDate;
import java.util.*;

public class GearRentController {
    private HashMap<String, Device> catalog = new HashMap<>();
    private HashMap<String, Member> members = new HashMap<>();
    private HashMap<String, Loan> activeLoans = new HashMap<>();

    public boolean addDevice(Device device) {
        if (device == null || catalog.containsKey(device.getId())) return false;
        catalog.put(device.getId(), device);
        return true;
    }

    public boolean addMember(Member member) {
        if (member == null || members.containsKey(member.getId())) return false;
        members.put(member.getId(), member);
        return true;
    }
    
    //대여 반납이 제대로 이뤄지지 않음 이유 모름겠음
    public Loan borrow(String memberId, String itemId, LocalDate today) {
        Device device = catalog.get(itemId);
        Member member = members.get(memberId);
        LocalDate dueDate = today.plusDays(device.getBorrowLimitDays());
        Loan loan = new Loan(itemId, memberId, today, dueDate);

        activeLoans.put(itemId, loan);
        device.increaseBorrowCount();

        return loan;
    }
    //대여 반납이 제대로 이뤄지지 않음 이유 모름겠음
    public int returnItem(String itemId, LocalDate today) {
        Loan loan = activeLoans.get(itemId);

        loan.setReturnedDate(today);
        Device device = catalog.get(itemId);
        int overdue = loan.overdueDays(today);
        int fee = device.calcLateFee(overdue);

        activeLoans.remove(itemId);
        return fee;
    }

    public ArrayList<Device> findByTag(String tag) {
        ArrayList<Device> result = new ArrayList<>();
        if (tag == null) return result;
        for (Device d : catalog.values()) if (d.hasTag(tag)) result.add(d);
        return result;
    }

    public ArrayList<Device> findByKeyword(String keyword) {
        ArrayList<Device> result = new ArrayList<>();
        if (keyword == null || keyword.isBlank()) return result;
        String key = keyword.toLowerCase();
        for (Device d : catalog.values()) {
            if (d.getName().toLowerCase().contains(key) ||
                d.getCategory().toLowerCase().contains(key)) result.add(d);
        }
        return result;
    }

    public Collection<Device> getAllDevices() {
    	return Collections.unmodifiableCollection(catalog.values()); 
    }
    public Collection<Loan> getActiveLoans() {
    	return Collections.unmodifiableCollection(activeLoans.values()); 
    }
}
