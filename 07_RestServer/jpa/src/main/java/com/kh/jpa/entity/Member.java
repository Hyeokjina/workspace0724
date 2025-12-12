package com.kh.jpa.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)//jpa 확신 필수
public class Member extends BaseTimeEntity {

    @Id
    @Column(length = 30)
    private String userId;

    @Column(length = 100, nullable = false)
    private  String userPwd;

    @Column(length = 15, nullable = false)
    private  String userName;

    @Column(length = 255)
    private  String email;

    @Column(length = 1)
    @Enumerated(EnumType.STRING)
    private  Gender gender;

    private  Integer age;

    @Column(length = 13)
    private  String phone;

    @Column(length = 100)
    private  String address;

    @Column(length = 1)
    @Enumerated(EnumType.STRING)
    private Status status = Status.Y;

    public enum Gender {
        M, F
    }

    public enum Status {
        Y, N, O
    }
}
