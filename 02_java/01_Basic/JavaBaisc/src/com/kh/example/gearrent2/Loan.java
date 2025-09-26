package com.kh.example.gearrent2;

import java.time.LocalDate;

public class Loan {
    private String itemId;
    private String memberId;
    private LocalDate startDate;
    private LocalDate dueDate;

    public Loan(String itemId, String memberId, LocalDate startDate, LocalDate dueDate) {
        this.itemId = itemId;
        this.memberId = memberId;
        this.startDate = startDate;
        this.dueDate = dueDate;
    }

    public String getItemId() { return itemId; }
    public String getMemberId() { return memberId; }
    public LocalDate getStartDate() { return startDate; }
    public LocalDate getDueDate() { return dueDate; }

    @Override
    public String toString() {
        return "Loan{itemId='" + itemId + "', memberId='" + memberId +
                "', startDate=" + startDate + ", dueDate=" + dueDate + "}";
    }
}
