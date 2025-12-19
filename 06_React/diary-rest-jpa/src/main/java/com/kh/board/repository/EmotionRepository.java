package com.kh.board.repository;

import com.kh.board.entity.Emotion;

import java.util.List;
import java.util.Optional;

public interface EmotionRepository {
    void save(Emotion emotion);
    List<Emotion> findAll();
    Optional<Emotion> findById(Long id);
    Optional<Emotion> findByName(String name);
}
