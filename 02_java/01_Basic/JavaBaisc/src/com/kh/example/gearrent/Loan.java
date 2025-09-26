package com.kh.example.gearrent;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

public class Loan {
    private String itemId;
    private String memberId;
    private LocalDate loanDate;
    private LocalDate dueDate;
    private LocalDate returnedDate;

    public Loan(String itemId, String memberId, LocalDate loanDate, LocalDate dueDate) {
        this.itemId = itemId;
        this.memberId = memberId;
        this.loanDate = loanDate;
        this.dueDate = dueDate;
        this.returnedDate = null;
    }

    public String getItemId() { 
    	return itemId; 
    }
    public String getMemberId()  {
    	return memberId; 
    }
    
    public LocalDate getLoanDate() {
    	return loanDate; 
    }
    public LocalDate getDueDate() {
    	return dueDate; 
    }
    public LocalDate getReturnedDate() {
    	return returnedDate;
    }

    public void setReturnedDate(LocalDate returnedDate) {
    	this.returnedDate = returnedDate; 
    }

    public boolean isOverdue(LocalDate today) {
        LocalDate compareDate = (returnedDate != null) ? returnedDate : today;
        return compareDate.isAfter(dueDate);
    }

    public int overdueDays(LocalDate today) {
        LocalDate compareDate = (returnedDate != null) ? returnedDate : today;
        if (compareDate.isAfter(dueDate)) {
        	long compareDates = ChronoUnit.DAYS.between(dueDate, compareDate);
            return (int)Math.abs(compareDates);
        }
        return 0;
    }

    @Override
    public String toString() {
        return itemId + " | " + memberId + " | " + loanDate + " | " + dueDate + " | " + returnedDate;
    }
}
