package com.kh.board.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "diary")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Diary extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, length = 500)
    @Lob
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "emotion_id", nullable = false)
    private Emotion emotion;

    public void changeMember(Member member) {
        this.member = member;
        if (!member.getDiaries().contains(this)) {
            member.getDiaries().add(this);
        }
    }

    public void changeEmotion(Emotion emotion) {
        this.emotion = emotion;
    }

    public void updateDiary(String title, String content) {
        if (title != null) this.title = title;
        if (content != null) this.content = content;
    }
}