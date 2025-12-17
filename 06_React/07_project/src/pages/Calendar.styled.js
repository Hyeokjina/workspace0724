import styled from 'styled-components'

export const Container = styled.div`
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
`

export const Header = styled.div`
    margin-bottom: 32px;
`

export const Title = styled.h1`
    font-size: 36px;
    font-weight: 700;
    color: #2C3E50;
    text-align: center;
`

export const MonthNavigator = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    padding: 0 20px;
`

export const NavButton = styled.button`
    background: #6C63FF;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 12px 20px;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: #5a52d5;
        transform: scale(1.05);
    }

    &:active {
        transform: scale(0.98);
    }
`

export const MonthDisplay = styled.div`
    font-size: 28px;
    font-weight: 700;
    color: #2C3E50;
`

export const WeekdayHeader = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 8px;
    margin-bottom: 8px;
    padding: 0 8px;

    > div {
        text-align: center;
        font-weight: 700;
        font-size: 14px;
        color: #7F8C8D;
        padding: 8px;

        &:first-child {
            color: #E74C3C; // 일요일
        }

        &:last-child {
            color: #3498DB; // 토요일
        }
    }
`

export const CalendarGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 8px;
    padding: 8px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`

export const EmptyDay = styled.div`
    aspect-ratio: 1;
    background: transparent;
`

export const DayCell = styled.div`
    aspect-ratio: 1;
    background: ${props => props.hasEmotion ? '#F0EFFF' : 'white'};
    border: 2px solid ${props => props.hasEmotion ? '#6C63FF' : '#E0E0E0'};
    border-radius: 12px;
    padding: 8px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: relative;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 6px 16px rgba(108, 99, 255, 0.2);
        border-color: #6C63FF;
        background: ${props => props.hasEmotion ? '#E8E6FF' : '#F9F9FF'};
    }

    &:active {
        transform: translateY(-2px);
    }
`

export const DayNumber = styled.div`
    font-size: 16px;
    font-weight: 600;
    color: ${props => props.isToday ? '#6C63FF' : '#2C3E50'};
    position: relative;
`

export const TodayIndicator = styled.div`
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 4px;
    background: #6C63FF;
    border-radius: 50%;
`

export const EmotionIcon = styled.div`
    font-size: 32px;
    margin-top: 4px;
    animation: pop 0.3s ease;

    @keyframes pop {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
        }
    }
`
