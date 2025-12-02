import React from 'react'
import { 
  HomeContainer, 
  Title, 
  StatsContainer, 
  StatCard, 
  StatNumber, 
  StatLabel,
  CategorySection,
  CategoryTitle,
  CategoryList,
  CategoryItem,
  CategoryName,
  CategoryBadge
} from './Home.styled'
import { useTodos } from '../context/TodoContext'

const Home = () => {
  const { todos } = useTodos();

  // 전체 Todo 통계 계산
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const pendingTodos = todos.filter(todo => !todo.completed).length;

  // 카테고리별 Todo 개수 계산
  const getCategoryCount = (category) => {
    return todos.filter(todo => todo.category === category && !todo.completed).length;
  };

  const categories = [
    { name: '업무', value: 'work', count: getCategoryCount('work') },
    { name: '건강', value: 'health', count: getCategoryCount('health') },
    { name: '학습', value: 'study', count: getCategoryCount('study') }
  ];

  return (
    <HomeContainer>
      <Title>Dashboard</Title>
      
      {/* 통계 카드 섹션 */}
      <StatsContainer>
        <StatCard color="#5833ff">
          <StatNumber>{totalTodos}</StatNumber>
          <StatLabel>전체 할일</StatLabel>
        </StatCard>
        
        <StatCard color="#24854c">
          <StatNumber>{completedTodos}</StatNumber>
          <StatLabel>완료</StatLabel>
        </StatCard>
        
        <StatCard color="#ff6b6b">
          <StatNumber>{pendingTodos}</StatNumber>
          <StatLabel>미완료</StatLabel>
        </StatCard>
      </StatsContainer>

      {/* 카테고리별 할일 섹션 */}
      <CategorySection>
        <CategoryTitle>카테고리별 할일</CategoryTitle>
        <CategoryList>
          {categories.map(category => (
            <CategoryItem key={category.value}>
              <CategoryName>{category.name}</CategoryName>
              <CategoryBadge>{category.count}</CategoryBadge>
            </CategoryItem>
          ))}
        </CategoryList>
      </CategorySection>
    </HomeContainer>
  )
}

export default Home
