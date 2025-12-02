import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTodos } from '../context/TodoContext'
import { 
  DetailContainer, 
  DetailCard, 
  DetailHeader,
  BackButton,
  PageTitle,
  DetailBody,
  Section,
  Label,
  StatusBadge,
  TextInput,
  CategorySelect,
  DateText,
  ActionButtons,
  SaveButton,
  DeleteButton,
  NotFound
} from './TodoDetail.styled'

const TodoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { todos, updateTodo, deleteTodo, toggleTodo } = useTodos();
  
  // 해당 ID의 todo 찾기
  const todo = todos.find(t => t.id === parseInt(id));
  
  // 수정 모드를 위한 상태
  const [editText, setEditText] = useState(todo?.text || '');
  const [editCategory, setEditCategory] = useState(todo?.category || 'work');
  
  // todo가 없으면 (잘못된 id)
  if (!todo) {
    return (
      <DetailContainer>
        <NotFound>
          <h2>할일을 찾을 수 없습니다</h2>
          <BackButton onClick={() => navigate('/todos')}>
            목록으로 돌아가기
          </BackButton>
        </NotFound>
      </DetailContainer>
    );
  }
  
  // 뒤로가기
  const handleBack = () => {
    navigate('/todos');
  };
  
  // 저장
  const handleSave = () => {
    if (editText.trim() === '') {
      alert('할일 내용을 입력해주세요');
      return;
    }
    
    updateTodo(todo.id, {
      text: editText,
      category: editCategory
    });
    
    alert('저장되었습니다');
    navigate('/todos');
  };
  
  // 삭제
  const handleDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deleteTodo(todo.id);
      navigate('/todos');
    }
  };
  
  // 상태 토글
  const handleToggleStatus = () => {
    toggleTodo(todo.id);
  };
  
  // 날짜 포맷팅
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };
  
  // 카테고리 한글 변환
  const getCategoryName = (category) => {
    const categories = {
      work: '업무',
      health: '건강',
      study: '학습'
    };
    return categories[category] || category;
  };
  
  return (
    <DetailContainer>
      <DetailCard>
        <DetailHeader>
          <PageTitle>할일 상세</PageTitle>
          <BackButton onClick={handleBack}>← 목록</BackButton>
        </DetailHeader>
        
        <DetailBody>
          {/* 상태 */}
          <Section>
            <Label>상태</Label>
            <StatusBadge 
              completed={todo.completed}
              onClick={handleToggleStatus}
            >
              {todo.completed ? '완료' : '미완료'}
            </StatusBadge>
          </Section>
          
          {/* 할일 내용 */}
          <Section>
            <Label>할일 내용</Label>
            <TextInput
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              placeholder="할일을 입력하세요"
            />
          </Section>
          
          {/* 카테고리 */}
          <Section>
            <Label>카테고리</Label>
            <CategorySelect
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
            >
              <option value="work">업무</option>
              <option value="health">건강</option>
              <option value="study">학습</option>
            </CategorySelect>
          </Section>
          
          {/* 생성일 */}
          <Section>
            <Label>생성일</Label>
            <DateText>{formatDate(todo.createdAt)}</DateText>
          </Section>
          
          {/* 버튼 */}
          <ActionButtons>
            <SaveButton onClick={handleSave}>저장</SaveButton>
            <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
          </ActionButtons>
        </DetailBody>
      </DetailCard>
    </DetailContainer>
  )
}

export default TodoDetail
