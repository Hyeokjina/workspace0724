import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../stores/useAuthStore'
import useDiaryStore from '../stores/useDiaryStore'
import { ROUTES } from '../routes/routePaths'
import {
    Container,
    Header,
    Title,
    MonthNavigator,
    NavButton,
    MonthDisplay,
    CalendarGrid,
    WeekdayHeader,
    DayCell,
    DayNumber,
    EmotionIcon,
    EmptyDay,
    TodayIndicator
} from './Calendar.styled'

// 감정 이모지 매핑
const EMOTIONS = {
    happy: '😊',
    sad: '😢',
    normal: '😐',
    fire: '🔥'
}

const Calendar = () => {
    const navigate = useNavigate()
    const currentUser = useAuthStore(state => state.currentUser)
    const isLoggedIn = useAuthStore(state => state.isLoggedIn)
    const getUserDiaries = useDiaryStore(state => state.getUserDiaries)
    const fetchDiaries = useDiaryStore(state => state.fetchDiaries)

    const [currentDate, setCurrentDate] = useState(new Date())

    // 서버에서 일기 데이터 가져오기
    useEffect(() => {
        if (isLoggedIn() && currentUser) {
            fetchDiaries(currentUser.id)
        }
    }, [isLoggedIn, currentUser, fetchDiaries])

    // 로그인 체크
    if (!isLoggedIn()) {
        navigate(ROUTES.LOGIN)
        return null
    }

    const userDiaries = getUserDiaries(currentUser.id)

    // 현재 월의 첫 날과 마지막 날
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)

    // 달력 시작 요일 (일요일 = 0)
    const startDayOfWeek = firstDay.getDay()
    const daysInMonth = lastDay.getDate()

    // 이전 달로 이동
    const goToPrevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1))
    }

    // 다음 달로 이동
    const goToNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1))
    }

    // 오늘 날짜
    const today = new Date()
    const isToday = (day) => {
        return (
            today.getFullYear() === year &&
            today.getMonth() === month &&
            today.getDate() === day
        )
    }

    // 특정 날짜의 일기 찾기
    const getDiaryForDate = (day) => {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
        return userDiaries.find(diary => {
            if (!diary.createdAt) return false
            const diaryDate = new Date(diary.createdAt)
            const diaryDateStr = `${diaryDate.getFullYear()}-${String(diaryDate.getMonth() + 1).padStart(2, '0')}-${String(diaryDate.getDate()).padStart(2, '0')}`
            return diaryDateStr === dateStr
        })
    }

    // 날짜 클릭 핸들러
    const handleDayClick = (day) => {
        const diary = getDiaryForDate(day)
        if (diary) {
            navigate(ROUTES.DIARY_DETAIL(diary.id))
        } else {
            // 일기가 없으면 작성 페이지로
            navigate(ROUTES.DIARY_WRITE)
        }
    }

    // 달력 셀 생성
    const renderCalendar = () => {
        const cells = []

        // 빈 셀 (이전 달)
        for (let i = 0; i < startDayOfWeek; i++) {
            cells.push(<EmptyDay key={`empty-${i}`} />)
        }

        // 날짜 셀
        for (let day = 1; day <= daysInMonth; day++) {
            const diary = getDiaryForDate(day)
            const isTodayDate = isToday(day)

            cells.push(
                <DayCell
                    key={day}
                    onClick={() => handleDayClick(day)}
                    hasEmotion={!!diary}
                >
                    <DayNumber isToday={isTodayDate}>
                        {day}
                        {isTodayDate && <TodayIndicator />}
                    </DayNumber>
                    {diary && (
                        <EmotionIcon>
                            {EMOTIONS[diary.emotion] || '😊'}
                        </EmotionIcon>
                    )}
                </DayCell>
            )
        }

        return cells
    }

    const monthName = currentDate.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long'
    })

    return (
        <Container>
            <Header>
                <Title>감정 달력</Title>
            </Header>

            <MonthNavigator>
                <NavButton onClick={goToPrevMonth}>◀</NavButton>
                <MonthDisplay>{monthName}</MonthDisplay>
                <NavButton onClick={goToNextMonth}>▶</NavButton>
            </MonthNavigator>

            <WeekdayHeader>
                <div>일</div>
                <div>월</div>
                <div>화</div>
                <div>수</div>
                <div>목</div>
                <div>금</div>
                <div>토</div>
            </WeekdayHeader>

            <CalendarGrid>
                {renderCalendar()}
            </CalendarGrid>
        </Container>
    )
}

export default Calendar
