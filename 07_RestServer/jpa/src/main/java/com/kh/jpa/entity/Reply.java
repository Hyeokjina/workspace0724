package com.kh.jpa.entity;

import com.kh.jpa.enums.CommonEnums;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "REPLY")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Reply extends BaseTimeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "REPLY_NO")
    private Long replyNo;

    @Column(name = "REPLY_CONTENT", length = 400, nullable = false)
    private String replyContent;

    @Column(name = "STATUS", length = 1, nullable = false)
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private CommonEnums.Status status = CommonEnums.Status.Y;

    // === 연관관계 맴핑 ===
    // 댓글 : 게시글 (N : 1) 연관관계 주인
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "REF_BNO", nullable = false)
    private Board board;

    // 댓글 : 댓글작성회원 (N : 1) 연관관계 주인
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "REPLY_WRITER", nullable = false)
    private Member writer;


}
