package com.kh.jdbc.test;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;

public class Test {
	private int tno;
	private String tnmae;
	private LocalDate tdate;
	public Test(int tno, String tnmae, LocalDate tdate) {
		super();
		this.tno = tno;
		this.tnmae = tnmae;
		this.tdate = tdate;
	}
	public int getTno() {
		return tno;
	}
	public void setTno(int tno) {
		this.tno = tno;
	}
	public String getTnmae() {
		return tnmae;
	}
	public void setTnmae(String tnmae) {
		this.tnmae = tnmae;
	}
	
	public LocalDate getTdate() {
		return tdate;
	}
	public void setTdate(LocalDate tdate) {
		this.tdate = tdate;
	}
	@Override
	public int hashCode() {
		return Objects.hashCode(tno);
	}
	@Override
	public boolean equals(Object obj) {
		if(obj instanceof Test) {
			return((Test)obj).getTno()==tno;
		}
		return false;
	}
	@Override
	public String toString() {
		
		return "TEST[tno=" + tno +",tname=" + ",tdate=" + tdate +"]";
	}
	
	
}
