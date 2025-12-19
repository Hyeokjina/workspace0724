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
                    const response = await apiRequest(`/diaries`);
                    // response는 이미 JSON 배열
                    const allDiaries = response || [];
                    // 사용자의 일기만 필터링 (userId 또는 memberId 확인)
                    const userDiaries = allDiaries.filter(diary =>
                        diary.userId === userId || diary.memberId === userId
                    );
                    set({ diaries: userDiaries, loading: false });
                    return userDiaries;
                } catch (error) {
                    set({ error: error.message, loading: false });
                    throw error;
                }
            },

            // 일기 추가
            addDiary: async (userId, title, content, emotion) => {
                set({ loading: true, error: null });
                try {
                    const response = await apiRequest('/diaries', {
                        method: 'POST',
                        body: JSON.stringify({
                            memberId: userId,
                            title,
                            content,
                            emotion
                        })
                    });

                    // 일기 작성 후 목록 다시 조회
                    await get().fetchDiaries(userId);

                    set({ loading: false });
                    return { success: response.success, message: response.message };
                } catch (error) {
                    set({ error: error.message, loading: false });
                    return { success: false, message: error.message };
                }
            },

            // 일기 수정
            updateDiary: async (id, userId, title, content, emotion) => {
                set({ loading: true, error: null });
                try {
                    const response = await apiRequest(`/diaries/${id}`, {
                        method: 'PUT',
                        body: JSON.stringify({
                            title,
                            content,
                            emotion
                        })
                    });

                    // 일기 수정 후 목록 다시 조회
                    await get().fetchDiaries(userId);

                    set({ loading: false });
                    return { success: response.success, message: response.message };
                } catch (error) {
                    set({ error: error.message, loading: false });
                    return { success: false, message: error.message };
                }
            },

            // 일기 삭제
            deleteDiary: async (id) => {
                set({ loading: true, error: null });
                try {
                    const response = await apiRequest(`/diaries/${id}`, {
                        method: 'DELETE'
                    });

                    set(state => ({
                        diaries: state.diaries.filter(diary => diary.id !== id),
                        loading: false
                    }));
                    return { success: response.success, message: response.message };
                } catch (error) {
                    set({ error: error.message, loading: false });
                    return { success: false, message: error.message };
                }
            },

            // 특정 유저의 일기 가져오기 (로컬 상태에서)
            getUserDiaries: (userId) => {
                const { diaries } = get();
                return diaries.filter(diary =>
                    diary.userId === userId || diary.memberId === userId
                );
            },

            // 감정별 일기 개수 가져오기 (로컬 상태에서)
            getEmotionCount: (userId, emotion) => {
                const { diaries } = get();
                return diaries.filter(diary =>
                    (diary.userId === userId || diary.memberId === userId) &&
                    diary.emotion === emotion
                ).length;
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
                    const response = await apiRequest(`/diaries/${id}`);
                    set({ loading: false });
                    return response.data;
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
