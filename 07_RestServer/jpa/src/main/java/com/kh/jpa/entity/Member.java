package com.kh.jpa.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "MEMBER")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class Member extends BaseTimeEntity {

    @Id
    @Column(name = "USER_ID", length = 30)
    private String userId;

    @Column(name = "USER_PWD", length = 100, nullable = false)
    private String userPwd;

    @Column(name = "USER_NAME", length = 15, nullable = false)
    private String userName;

    @Column(name = "EMAIL", length = 254)
    private String email;

    @Column(name = "GENDER", length = 1)
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(name = "AGE")
    private Integer age;

    @Column(name = "PHONE", length = 13)
    private String phone;

    @Column(name = "ADDRESS", length = 100)
    private String address;

    @Column(name = "STATUS", length = 1, nullable = false)
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Status status = Status.Y;

    //연관관계 맵핑 (프로필과 1대1)
    //cascade : Member객체 상태가 삭제(변경)되면 프로필에도 영향을 주겠다.
    //orphanRemoval : Member객체에서 프로필의 참조값이 삭제되면 실제 db에 반영하겠다.
    @OneToOne(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private Profile profile;

    public enum Gender {
        M, F
    }

    public enum Status {
        Y, N
    }


}
