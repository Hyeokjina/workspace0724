import React from 'react'
import { DeleteButton, TodoContent, TodoItemContainer, TodoText, Checkbox } from './TodoItem.styled'

const TodoItem = ({todo}) => {
  return (
    <TodoItemContainer>
        <TodoContent>
            <Checkbox 
                type='checkbox'
                checked={todo.completed}
                onChange={() => {/* 체크박스 토글 로직 */}}
            />
            <TodoText to={`/todos/${todo.id}`} completed={todo.completed ? 'true' : undefined}>
              {todo.text}
            </TodoText>
        </TodoContent>
        <DeleteButton>삭제</DeleteButton>
    </TodoItemContainer>
  )
}

export default TodoItem