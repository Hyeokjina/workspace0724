package com.kh.jpa.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "BOARD")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BOARD_NO")
    private Long boardNo;

    @Column(name = "BOARD_TITLE", length = 100, nullable = false)
    private String boardTitle;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "BOARD_WRITER", nullable = false)
    private Member writer;

    @Lob
    @Column(name = "BOARD_CONTENT", nullable = false)
    private String boardContent;

    @Column(name = "ORIGIN_NAME", length = 100)
    private String originName;

    @Column(name = "CHANGE_NAME", length = 100)
    private String changeName;

    @Column(name = "COUNT")
    @Builder.Default
    private Integer count = 0;

    @CreatedDate
    @Column(name = "CREATE_DATE", updatable = false)
    private LocalDateTime createDate;

    @Column(name = "STATUS", length = 1, nullable = false)
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Status status = Status.Y;

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Reply> replies = new ArrayList<>();

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<BoardTag> boardTags = new ArrayList<>();

    public enum Status {
        Y, N
    }

    // 비즈니스 메서드
    public void updateBoard(String title, String content, String originName, String changeName) {
        this.boardTitle = title;
        this.boardContent = content;
        this.originName = originName;
        this.changeName = changeName;
    }

    public void increaseCount() {
        this.count++;
    }

    public void delete() {
        this.status = Status.N;
    }

    public void addTag(Tag tag) {
        BoardTag boardTag = BoardTag.builder()
                .board(this)
                .tag(tag)
                .build();
        this.boardTags.add(boardTag);
    }
}
