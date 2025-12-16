// API 기본 설정 (Vite 프록시 활용)
export const API_BASE_URL = '/api';

// API 요청 헬퍼 함수
export const apiRequest = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;

    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    };

    try {
        const response = await fetch(url, defaultOptions);

        // HTTP 에러 체크
        if (!response.ok) {
            const error = await response.json().catch(() => ({
                message: `HTTP error! status: ${response.status}`
            }));
            throw new Error(error.message || 'API 요청 실패');
        }

        // 204 No Content 처리
        if (response.status === 204) {
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('API Request Error:', error);
        throw error;
    }
};
