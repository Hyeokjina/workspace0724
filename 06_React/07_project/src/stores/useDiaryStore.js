import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { apiRequest } from '../api/config'

const useDiaryStore = create(
    persist(
        (set, get) => ({
            // 상태
            diaries: [],
            loading: false,
            error: null,

            // 로딩 상태 설정
            setLoading: (loading) => set({ loading }),
            setError: (error) => set({ error }),

            // 전체 일기 목록 가져오기 (서버에서)
            fetchDiaries: async (userId) => {
                set({ loading: true, error: null });
                try {
                    const data = await apiRequest(`/diaries/user/${userId}`);
                    set({ diaries: data, loading: false });
                    return data;
                } catch (error) {
                    set({ error: error.message, loading: false });
                    throw error;
                }
            },

            // 일기 추가
            addDiary: async (userId, content, emotion) => {
                set({ loading: true, error: null });
                try {
                    const newDiary = await apiRequest('/diaries', {
                        method: 'POST',
                        body: JSON.stringify({
                            userId,
                            content,
                            emotion,
                            date: new Date().toISOString().split('T')[0]
                        })
                    });

                    set(state => ({
                        diaries: [...state.diaries, newDiary],
                        loading: false
                    }));
                    return newDiary;
                } catch (error) {
                    set({ error: error.message, loading: false });
                    throw error;
                }
            },

            // 일기 수정
            updateDiary: async (id, content, emotion) => {
                set({ loading: true, error: null });
                try {
                    const updatedDiary = await apiRequest(`/diaries/${id}`, {
                        method: 'PUT',
                        body: JSON.stringify({ content, emotion })
                    });

                    set(state => ({
                        diaries: state.diaries.map(diary =>
                            diary.id === id ? updatedDiary : diary
                        ),
                        loading: false
                    }));
                    return updatedDiary;
                } catch (error) {
                    set({ error: error.message, loading: false });
                    throw error;
                }
            },

            // 일기 삭제
            deleteDiary: async (id) => {
                set({ loading: true, error: null });
                try {
                    await apiRequest(`/diaries/${id}`, {
                        method: 'DELETE'
                    });

                    set(state => ({
                        diaries: state.diaries.filter(diary => diary.id !== id),
                        loading: false
                    }));
                } catch (error) {
                    set({ error: error.message, loading: false });
                    throw error;
                }
            },

            // 특정 유저의 일기 가져오기 (로컬 상태에서)
            getUserDiaries: (userId) => {
                const { diaries } = get();
                return diaries.filter(diary => diary.userId === userId);
            },

            // 검색 (서버에서)
            searchDiaries: async (userId, keyword) => {
                set({ loading: true, error: null });
                try {
                    const data = await apiRequest(`/diaries/search?userId=${userId}&keyword=${encodeURIComponent(keyword)}`);
                    set({ loading: false });
                    return data;
                } catch (error) {
                    set({ error: error.message, loading: false });
                    throw error;
                }
            },

            // 감정별 필터 (서버에서)
            filterByEmotion: async (userId, emotion) => {
                set({ loading: true, error: null });
                try {
                    const data = await apiRequest(`/diaries/filter?userId=${userId}&emotion=${emotion}`);
                    set({ loading: false });
                    return data;
                } catch (error) {
                    set({ error: error.message, loading: false });
                    throw error;
                }
            },

            // 특정 일기 가져오기 (서버에서)
            getDiaryById: async (id) => {
                set({ loading: true, error: null });
                try {
                    const diary = await apiRequest(`/diaries/${id}`);
                    set({ loading: false });
                    return diary;
                } catch (error) {
                    set({ error: error.message, loading: false });
                    throw error;
                }
            }
        }),
        {
            name: 'diary-storage',
            // API 연동 시에는 diaries만 persist (캐싱 목적)
            partialize: (state) => ({ diaries: state.diaries })
        }
    )
);

export default useDiaryStore;
