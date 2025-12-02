import styled from "styled-components";

export const HomeContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
`

export const Title = styled.h1`
    font-size: 42px;
    font-weight: bold;
    margin-bottom: 36px;
    color: #333;
    text-align: center;
`

// 통계 카드 컨테이너
export const StatsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin-bottom: 48px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`

// 개별 통계 카드
export const StatCard = styled.div`
    background: white;
    padding: 32px 24px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    text-align: center;
    transition: transform 0.2s, box-shadow 0.2s;
    border-top: 4px solid ${props => props.color || '#5833ff'};

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    }
`

// 통계 숫자
export const StatNumber = styled.div`
    font-size: 48px;
    font-weight: 800;
    color: #333;
    margin-bottom: 8px;
`

// 통계 라벨
export const StatLabel = styled.div`
    font-size: 16px;
    color: #666;
    font-weight: 500;
`

// 카테고리 섹션
export const CategorySection = styled.div`
    background: white;
    padding: 32px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`

// 카테고리 타이틀
export const CategoryTitle = styled.h2`
    font-size: 24px;
    font-weight: 700;
    color: #333;
    margin-bottom: 24px;
    text-align: center;
`

// 카테고리 리스트
export const CategoryList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

// 카테고리 아이템
export const CategoryItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    background: #f8f9fa;
    border-radius: 8px;
    transition: all 0.2s;

    &:hover {
        background: #e9ecef;
        transform: translateX(4px);
    }
`

// 카테고리 이름
export const CategoryName = styled.div`
    font-size: 18px;
    font-weight: 600;
    color: #333;
`

// 카테고리 뱃지 (개수 표시)
export const CategoryBadge = styled.div`
    background: #5833ff;
    color: white;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 16px;
    font-weight: 700;
    min-width: 40px;
    text-align: center;
`
