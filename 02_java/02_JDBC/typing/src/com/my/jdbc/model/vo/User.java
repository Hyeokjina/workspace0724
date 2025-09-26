package com.my.jdbc.model.vo;

import java.time.LocalDateTime;

public class User {
		private int userNo;
		private String userId;
		private String userPwd;
		private String userName;
		private String gender;
		private int age;
		private String email;
		private String phone;
		private LocalDateTime enrollDate;
		private int highScore;
		

		public User() {
			super();
		}

		public User(String userId, String userPwd) {
			super();
			this.userId = userId;
			this.userPwd = userPwd;
		}




		public User(String userId, int highScore) {
			super();
			this.userId = userId;
			this.highScore = highScore;
		}


		public User(int userNo, String userId, String userPwd, String userName, String gender, int age, String email,
				String phone, LocalDateTime enrollDate) {
			super();
			this.userNo = userNo;
			this.userId = userId;
			this.userPwd = userPwd;
			this.userName = userName;
			this.gender = gender;
			this.age = age;
			this.email = email;
			this.phone = phone;
			this.enrollDate = enrollDate;
		}


		public User(String userId, String userPwd, String userName, String gender, int age, String email,
				String phone) {
			super();
			this.userId = userId;
			this.userPwd = userPwd;
			this.userName = userName;
			this.gender = gender;
			this.age = age;
			this.email = email;
			this.phone = phone;
		}


		public int getUserNo() {
			return userNo;
		}


		public void setUserNo(int userNo) {
			this.userNo = userNo;
		}


		public String getUserId() {
			return userId;
		}


		public void setUserId(String userId) {
			this.userId = userId;
		}


		public String getUserPwd() {
			return userPwd;
		}


		public void setUserPwd(String userPwd) {
			this.userPwd = userPwd;
		}


		public String getUserName() {
			return userName;
		}


		public void setUserName(String userName) {
			this.userName = userName;
		}


		public String getGender() {
			return gender;
		}


		public void setGender(String gender) {
			this.gender = gender;
		}


		public int getAge() {
			return age;
		}


		public void setAge(int age) {
			this.age = age;
		}


		public String getEmail() {
			return email;
		}


		public void setEmail(String email) {
			this.email = email;
		}


		public String getPhone() {
			return phone;
		}


		public void setPhone(String phone) {
			this.phone = phone;
		}


		public LocalDateTime getEnrollDate() {
			return enrollDate;
		}


		public void setEnrollDate(LocalDateTime enrollDate) {
			this.enrollDate = enrollDate;
		}
		
		public int getHighScore() {
			return highScore;
		}


		public void setHighScore(int highScore) {
			this.highScore = highScore;
		}
		
		@Override
		public String toString() {
			return "User [userNo=" + userNo + ", userId=" + userId + ", userPwd=" + userPwd + ", userName=" + userName
					+ ", gender=" + gender + ", age=" + age + ", email=" + email + ", phone=" + phone + ", enrollDate="
					+ enrollDate + "]";
		}


		

}
