package com.kh.board.service;

import com.kh.board.controller.dto.request.DiaryRequest;
import com.kh.board.controller.dto.response.DiaryResponse;
import com.kh.board.entity.Diary;
import com.kh.board.entity.Emotion;
import com.kh.board.entity.Member;
import com.kh.board.repository.DiaryRepository;
import com.kh.board.repository.EmotionRepository;
import com.kh.board.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Transactional
public class DiaryServiceImpl implements DiaryService {

    private final DiaryRepository diaryRepository;
    private final MemberRepository memberRepository;
    private final EmotionRepository emotionRepository;

    @Override
    public List<DiaryResponse> findAll() {
        return diaryRepository.findAll()
                .stream()
                .map(diary -> DiaryResponse.of(
                        diary.getId(),
                        diary.getTitle(),
                        diary.getEmotion().getName(),
                        diary.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }

    @Override
    public List<DiaryResponse> findByMemberId(Long memberId) {
        return diaryRepository.findByMemberId(memberId)
                .stream()
                .map(diary -> DiaryResponse.of(
                        diary.getId(),
                        diary.getTitle(),
                        diary.getEmotion().getName(),
                        diary.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }

    @Override
    public DiaryResponse findById(Long id) {
        Diary diary = diaryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 일기를 찾을 수 없습니다."));

        return DiaryResponse.detail(
                diary.getId(),
                diary.getMember().getId(),
                diary.getTitle(),
                diary.getContent(),
                diary.getEmotion().getName(),
                diary.getCreatedAt(),
                diary.getUpdatedAt()
        );
    }

    @Override
    public void save(DiaryRequest.Create createDto) {
        Member member = memberRepository.findById(createDto.getMemberId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));

        Emotion emotion = emotionRepository.findByName(createDto.getEmotion())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 감정입니다."));

        Diary diary = Diary.builder()
                .title(createDto.getTitle())
                .content(createDto.getContent())
                .build();

        diary.changeMember(member);
        diary.changeEmotion(emotion);

        diaryRepository.save(diary);
    }

    @Override
    public void updateById(Long id, DiaryRequest.Update updateDto) {
        Diary diary = diaryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 일기를 찾을 수 없습니다."));

        diary.updateDiary(updateDto.getTitle(), updateDto.getContent());

        if (updateDto.getEmotion() != null) {
            Emotion emotion = emotionRepository.findByName(updateDto.getEmotion())
                    .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 감정입니다."));
            diary.changeEmotion(emotion);
        }
    }

    @Override
    public void deleteById(Long id) {
        Diary diary = diaryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 일기를 찾을 수 없습니다."));

        diaryRepository.delete(diary);
    }
}
