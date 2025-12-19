package com.kh.board.repository;

import com.kh.board.entity.Diary;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class DiaryRepositoryImpl implements DiaryRepository {

    @PersistenceContext
    private EntityManager em;

    @Override
    public Diary save(Diary diary) {
        em.persist(diary);
        return diary;
    }

    @Override
    public List<Diary> findAll() {
        String jpql = "select d from Diary d join fetch d.emotion order by d.createdAt desc";
        return em.createQuery(jpql, Diary.class)
                .getResultList();
    }

    @Override
    public Optional<Diary> findById(Long id) {
        String jpql = "select d from Diary d join fetch d.emotion join fetch d.member where d.id = :id";
        try {
            Diary diary = em.createQuery(jpql, Diary.class)
                    .setParameter("id", id)
                    .getSingleResult();
            return Optional.of(diary);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    @Override
    public List<Diary> findByMemberId(Long memberId) {
        String jpql = "select d from Diary d join fetch d.emotion where d.member.id = :memberId order by d.createdAt desc";
        return em.createQuery(jpql, Diary.class)
                .setParameter("memberId", memberId)
                .getResultList();
    }

    @Override
    public void delete(Diary diary) {
        em.remove(diary);
    }
}
