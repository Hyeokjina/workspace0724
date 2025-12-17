import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useAuthStore from '../stores/useAuthStore'
import useDiaryStore from '../stores/useDiaryStore'
import { ROUTES } from '../routes/routePaths'
import {
    Container,
    FormCard,
    Title,
    Form,
    DateDisplay,
    EmotionPicker,
    EmotionButton,
    TextareaGroup,
    Label,
    Textarea,
    ButtonGroup,
    SubmitButton,
    CancelButton,
    ErrorMessage
} from './DiaryWrite.styled'
import styled from 'styled-components'

// 추가 스타일
const DeleteButton = styled.button`
    flex: 1;
    padding: 14px;
    background: #E74C3C;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: #c0392b;
    }
`

const NotFoundCard = styled.div`
    background: white;
    padding: 80px 48px;
    border-radius: 16px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    text-align: center;

    h2 {
        font-size: 32px;
        color: #2C3E50;
        margin-bottom: 16px;
    }

    p {
        color: #7F8C8D;
        margin-bottom: 24px;
    }
`

// 감정 옵션
const EMOTIONS = [
    { value: 'happy', emoji: '😊', label: '좋았어' },
    { value: 'sad', emoji: '😢', label: '힘들어..' },
    { value: 'normal', emoji: '😐', label: '그냥 그래' },
    { value: 'fire', emoji: '🔥', label: '최고!' }
]

const DiaryDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    
    const currentUser = useAuthStore(state => state.currentUser);
    const isLoggedIn = useAuthStore(state => state.isLoggedIn);
    const getDiaryById = useDiaryStore(state => state.getDiaryById);
    const updateDiary = useDiaryStore(state => state.updateDiary);
    const deleteDiary = useDiaryStore(state => state.deleteDiary);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [emotion, setEmotion] = useState('happy');
    const [error, setError] = useState('');
    const [diary, setDiary] = useState(null);

    useEffect(() => {
        const loadDiary = async () => {
            if (isLoggedIn()) {
                const response = await getDiaryById(id);
                const foundDiary = response.data || response;
                // userId 또는 memberId 확인
                const diaryOwnerId = foundDiary.userId || foundDiary.memberId;
                if (foundDiary && diaryOwnerId === currentUser.id) {
                    setDiary(foundDiary);
                    setTitle(foundDiary.title || '');
                    setContent(foundDiary.content);
                    setEmotion(foundDiary.emotion);
                }
            }
        };
        loadDiary();
    }, [id, isLoggedIn, getDiaryById, currentUser]);

    // 로그인 체크
    if (!isLoggedIn()) {
        navigate(ROUTES.LOGIN);
        return null;
    }

    // 일기가 없거나 다른 사용자의 일기인 경우
    if (!diary) {
        return (
            <Container>
                <NotFoundCard>
                    <h2>일기를 찾을 수 없습니다</h2>
                    <p>삭제되었거나 존재하지 않는 일기입니다.</p>
                    <CancelButton onClick={() => navigate(ROUTES.DIARY_LIST)}>
                        목록으로 돌아가기
                    </CancelButton>
                </NotFoundCard>
            </Container>
        );
    }

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        });
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        setError('');
    }

    const handleContentChange = (e) => {
        setContent(e.target.value);
        setError('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (title.trim().length === 0) {
            setError('제목을 입력해주세요.');
            return;
        }

        if (content.trim().length === 0) {
            setError('일기 내용을 입력해주세요.');
            return;
        }

        const result = await updateDiary(diary.id, title.trim(), content.trim(), emotion);

        if (result.success) {
            navigate(ROUTES.DIARY_LIST);
        } else {
            setError(result.message || '일기 수정에 실패했습니다.');
        }
    }

    const handleDelete = async () => {
        if (window.confirm('정말 이 일기를 삭제하시겠습니까?')) {
            const result = await deleteDiary(diary.id);

            if (result.success) {
                navigate(ROUTES.DIARY_LIST);
            } else {
                setError(result.message || '일기 삭제에 실패했습니다.');
            }
        }
    }

    return (
        <Container>
            <FormCard>
                <Title>일기 수정</Title>
                <DateDisplay>{formatDate(diary.createdAt)}</DateDisplay>

                <Form onSubmit={handleSubmit}>
                    <TextareaGroup>
                        <Label>제목</Label>
                        <Textarea
                            value={title}
                            onChange={handleTitleChange}
                            placeholder="제목을 입력하세요"
                            rows={1}
                            style={{ resize: 'none' }}
                        />
                    </TextareaGroup>

                    <EmotionPicker>
                        <Label>오늘의 기분</Label>
                        <div>
                            {EMOTIONS.map(emo => (
                                <EmotionButton
                                    key={emo.value}
                                    type="button"
                                    active={emotion === emo.value}
                                    onClick={() => setEmotion(emo.value)}
                                >
                                    <span className="emoji">{emo.emoji}</span>
                                    <span className="label">{emo.label}</span>
                                </EmotionButton>
                            ))}
                        </div>
                    </EmotionPicker>

                    <TextareaGroup>
                        <Label>오늘 하루를 한 줄로 표현해보세요</Label>
                        <Textarea
                            value={content}
                            onChange={handleContentChange}
                            placeholder="오늘은 어떤 하루였나요?"
                            rows={4}
                        />
                    </TextareaGroup>

                    {error && <ErrorMessage>{error}</ErrorMessage>}

                    <ButtonGroup>
                        <CancelButton type="button" onClick={() => navigate(ROUTES.DIARY_LIST)}>
                            목록으로
                        </CancelButton>
                        <DeleteButton type="button" onClick={handleDelete}>
                            삭제
                        </DeleteButton>
                        <SubmitButton type="submit">
                            수정하기
                        </SubmitButton>
                    </ButtonGroup>
                </Form>
            </FormCard>
        </Container>
    )
}

export default DiaryDetail
