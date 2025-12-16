package com.kh.jpa.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "PROFILE")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PROFILE_ID")
    private Long profileId;

    @Column(name = "PROFILE_IMAGE", length = 100)
    private String profileImage;

    @Column(name = "INTRO", length = 300)
    private String intro;

    //연관관계 맵핑
    //1대1일
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID", unique = true, nullable = false)
    private Member member;
}
