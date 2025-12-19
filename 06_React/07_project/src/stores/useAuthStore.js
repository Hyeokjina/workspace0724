import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { apiRequest } from '../api/config'

const useAuthStore = create(
    persist(
        (set, get) => ({
            // 상태
            currentUser: null,
            loading: false,
            error: null,

            // 로딩 상태 설정
            setLoading: (loading) => set({ loading }),
            setError: (error) => set({ error }),

            // 로그인 여부 확인
            isLoggedIn: () => !!get().currentUser,

            // 회원가입
            signup: async (email, password, nickname) => {
                set({ loading: true, error: null });
                try {
                    const response = await apiRequest('/members/signup', {
                        method: 'POST',
                        body: JSON.stringify({
                            email,
                            password,
                            nickname
                        })
                    });

                    set({ loading: false });
                    return { success: response.success, message: response.message };
                } catch (error) {
                    set({ error: error.message, loading: false });
                    return { success: false, message: error.message };
                }
            },

            // 로그인
            login: async (email, password) => {
                set({ loading: true, error: null });
                try {
                    const response = await apiRequest('/members/login', {
                        method: 'POST',
                        body: JSON.stringify({
                            email,
                            password
                        })
                    });

                    const userInfo = {
                        id: response.data.id,
                        email: response.data.email,
                        nickname: response.data.nickname
                    };

                    set({ currentUser: userInfo, loading: false });
                    return { success: true, message: response.message };
                } catch (error) {
                    set({ error: error.message, loading: false });
                    return { success: false, message: error.message || '이메일 또는 비밀번호가 틀렸습니다.' };
                }
            },

            // 로그아웃
            logout: () => {
                set({ currentUser: null });
            },

            // 회원정보 수정
            updateUser: async (newEmail, newPassword, newNickname) => {
                const { currentUser } = get();
                if (!currentUser) {
                    return { success: false, message: '로그인이 필요합니다.' };
                }

                set({ loading: true, error: null });
                try {
                    const response = await apiRequest(`/members/${currentUser.id}`, {
                        method: 'PUT',
                        body: JSON.stringify({
                            email: newEmail,
                            password: newPassword,
                            nickname: newNickname
                        })
                    });

                    // currentUser 업데이트
                    const updatedCurrentUser = {
                        ...currentUser,
                        email: response.data.email,
                        nickname: response.data.nickname
                    };

                    set({
                        currentUser: updatedCurrentUser,
                        loading: false
                    });

                    return { success: response.success, message: response.message };
                } catch (error) {
                    set({ error: error.message, loading: false });
                    return { success: false, message: error.message || '회원정보 수정에 실패했습니다.' };
                }
            },

            // 현재 유저의 비밀번호 가져오기 (서버에서)
            getCurrentUserPassword: async () => {
                const { currentUser } = get();
                if (!currentUser) return null;

                try {
                    const user = await apiRequest(`/members/${currentUser.id}`);
                    return user.password;
                } catch (error) {
                    console.error('Error fetching user password:', error);
                    return null;
                }
            },

            // 회원 탈퇴
            deleteUser: async () => {
                const { currentUser } = get();
                if (!currentUser) {
                    return { success: false, message: '로그인이 필요합니다.' };
                }

                set({ loading: true, error: null });
                try {
                    const response = await apiRequest(`/members/${currentUser.id}`, {
                        method: 'DELETE'
                    });

                    set({
                        currentUser: null,
                        loading: false
                    });

                    return { success: response.success, message: response.message };
                } catch (error) {
                    set({ error: error.message, loading: false });
                    return { success: false, message: error.message || '회원 탈퇴에 실패했습니다.' };
                }
            }
        }),
        {
            name: 'auth-storage',
            // API 연동 시에는 currentUser만 persist (세션 유지 목적)
            partialize: (state) => ({
                currentUser: state.currentUser
            })
        }
    )
);

export default useAuthStore;
