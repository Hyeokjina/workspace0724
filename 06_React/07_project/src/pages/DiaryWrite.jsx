import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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

// 감정 옵션
const EMOTIONS = [
    { value: 'happy', emoji: '😊', label: '좋았어' },
    { value: 'sad', emoji: '😢', label: '힘들어..' },
    { value: 'normal', emoji: '😐', label: '그냥 그래' },
    { value: 'fire', emoji: '🔥', label: '최고!' }
]

const DiaryWrite = () => {
    const navigate = useNavigate();
    
    const currentUser = useAuthStore(state => state.currentUser);
    const isLoggedIn = useAuthStore(state => state.isLoggedIn);
    const addDiary = useDiaryStore(state => state.addDiary);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [emotion, setEmotion] = useState('happy');
    const [error, setError] = useState('');

    // 로그인 체크
    if (!isLoggedIn()) {
        navigate(ROUTES.LOGIN);
        return null;
    }

    const today = new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    });

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

        if (content.trim().length < 5) {
            setError('최소 5자 이상 입력해주세요.');
            return;
        }

        const result = await addDiary(currentUser.id, title.trim(), content.trim(), emotion);

        if (result.success) {
            navigate(ROUTES.DIARY_LIST);
        } else {
            setError(result.message || '일기 저장에 실패했습니다.');
        }
    }

    const handleCancel = () => {
        navigate(ROUTES.DIARY_LIST);
    };


    return (
        <Container>
            <FormCard>
                <Title>오늘 한 줄 일기</Title>
                <DateDisplay>{today}</DateDisplay>

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
                        <CancelButton type="button" onClick={handleCancel}>
                            취소
                        </CancelButton>
                        <SubmitButton type="submit">
                            저장하기
                        </SubmitButton>
                    </ButtonGroup>
                </Form>
            </FormCard>
        </Container>
    )
}

export default DiaryWrite
