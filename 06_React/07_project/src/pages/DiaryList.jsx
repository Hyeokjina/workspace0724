import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../stores/useAuthStore'
import useDiaryStore from '../stores/useDiaryStore'
import { ROUTES } from '../routes/routePaths'
import {
    Container,
    Header,
    Title,
    Controls,
    SearchBar,
    SearchInput,
    WriteButton,
    DiaryGrid,
    DiaryCard,
    DiaryDate,
    DiaryEmotion,
    DiaryTitle,
    DiaryContent,
    EmptyState,
    LoginPrompt
} from './DiaryList.styled'

// 감정 이모지 매핑
const EMOTIONS = {
    happy: { emoji: '😊', label: '좋았어' },
    sad: { emoji: '😢', label: '힘들었어' },
    normal: { emoji: '😐', label: '그냥 그래' },
    fire: { emoji: '🔥', label: '최고!' }
}

const DiaryList = () => {
    const navigate = useNavigate();
    
    // Zustand stores 사용
    const currentUser = useAuthStore(state => state.currentUser);
    const isLoggedIn = useAuthStore(state => state.isLoggedIn);
    const getUserDiaries = useDiaryStore(state => state.getUserDiaries);
    const fetchDiaries = useDiaryStore(state => state.fetchDiaries);

    const [searchKeyword, setSearchKeyword] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    // 서버에서 일기 데이터 가져오기
    useEffect(() => {
        if (isLoggedIn() && currentUser) {
            fetchDiaries(currentUser.id);
        }
    }, [isLoggedIn, currentUser, fetchDiaries]);

    // 로그인하지 않은 경우
    if (!isLoggedIn()) {
        return (
            <Container>
                <LoginPrompt>
                    <h2>로그인이 필요합니다</h2>
                    <p>일기를 작성하고 관리하려면 로그인해주세요.</p>
                    <button onClick={() => navigate(ROUTES.LOGIN)}>
                        로그인하러 가기
                    </button>
                </LoginPrompt>
            </Container>
        )
    }

    // 현재 유저의 일기 가져오기 (동기 함수 사용)
    const userDiaries = getUserDiaries(currentUser.id);

    // 검색어로 필터링 (클라이언트 사이드)
    const filteredDiaries = isSearching && searchKeyword.trim()
        ? userDiaries.filter(diary =>
            diary.content.toLowerCase().includes(searchKeyword.toLowerCase())
          )
        : userDiaries;

    // 최신순 정렬
    const sortedDiaries = [...filteredDiaries].sort((a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    );

    const handleSearch = () => {
        if (searchKeyword.trim()) {
            setIsSearching(true);
        } else {
            setIsSearching(false);
        }
    }

    const handleSearchKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    return (
        <Container>
            <Header>
                <Title>내 일기장</Title>
                <Controls>
                    <SearchBar>
                        <SearchInput
                            type="text"
                            placeholder="일기 검색..."
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            onKeyDown={handleSearchKeyDown}
                        />
                    </SearchBar>
                    <WriteButton onClick={() => navigate(ROUTES.DIARY_WRITE)}>
                        일기 쓰기
                    </WriteButton>
                </Controls>
            </Header>

            {sortedDiaries.length === 0 ? (
                !isSearching && (
                    <EmptyState>
                        <h3>아직 작성한 일기가 없습니다</h3>
                        <p>첫 일기를 작성해보세요!</p>
                    </EmptyState>
                )
            ) : (
                <DiaryGrid>
                    {sortedDiaries.map(diary => (
                        <DiaryCard
                            key={diary.id}
                            onClick={() => navigate(ROUTES.DIARY_DETAIL(diary.id))}
                        >
                            <DiaryDate>{formatDate(diary.createdAt)}</DiaryDate>
                            <DiaryEmotion>
                                {EMOTIONS[diary.emotion] ? EMOTIONS[diary.emotion].emoji : '😊'}
                            </DiaryEmotion>
                            <DiaryTitle>{diary.title}</DiaryTitle>
                            <DiaryContent>{diary.content}</DiaryContent>
                        </DiaryCard>
                    ))}
                </DiaryGrid>
            )}
        </Container>
    )
}

export default DiaryList
