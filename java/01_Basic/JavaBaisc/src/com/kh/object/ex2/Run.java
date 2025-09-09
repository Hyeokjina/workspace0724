package com.kh.object.ex2;

public class Run {

	public static void main(String[] args) {
		BankAccount ac1 = new BankAccount();
		
		
		ac1.deposit(5000);
		ac1.withdraw(1000);
		ac1.checkMyBalnace();
		
		BankAccount ac2 = new BankAccount();
		ac2.deposit(5000);
		
		ac1.transfer(ac2,1000);
		ac1.checkMyBalnace();
		ac2.checkMyBalnace();

	}
  
}
