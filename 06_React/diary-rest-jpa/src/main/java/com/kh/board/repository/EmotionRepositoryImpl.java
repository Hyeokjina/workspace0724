package com.kh.board.repository;

import com.kh.board.entity.Emotion;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class EmotionRepositoryImpl implements EmotionRepository {

    @PersistenceContext
    private EntityManager em;

    @Override
    public void save(Emotion emotion) {
        em.persist(emotion);
    }

    @Override
    public List<Emotion> findAll() {
        return em.createQuery("select e from Emotion e", Emotion.class)
                .getResultList();
    }

    @Override
    public Optional<Emotion> findById(Long id) {
        return Optional.ofNullable(em.find(Emotion.class, id));
    }

    @Override
    public Optional<Emotion> findByName(String name) {
        try {
            String jpql = "select e from Emotion e where e.name = :name";
            Emotion emotion = em.createQuery(jpql, Emotion.class)
                    .setParameter("name", name)
                    .getSingleResult();
            return Optional.of(emotion);
        } catch (NoResultException e) {
            return Optional.empty();
        }
    }
}
