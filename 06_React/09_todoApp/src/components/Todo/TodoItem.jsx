import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Checkbox, DeleteButton, DetailButton, TodoContent, TodoItemContainer, TodoText } from './TodoItem.styled'

const TodoItem = ({todo, onToggle, onDelete}) => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log(todo)
    },[todo])

    const handleDetailClick = () => {
        navigate(`/todos/${todo.id}`);
    }

    return (
        <TodoItemContainer>
            <TodoContent>
                <Checkbox 
                    type='checkbox'
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                />
                <TodoText to={`/todos/${todo.id}`} completed={todo.completed ? 'true' : undefined}>
                    {todo.text}
                </TodoText>
            </TodoContent>
            <DetailButton onClick={handleDetailClick}>보기</DetailButton>
            <DeleteButton onClick={()=> onDelete(todo.id)}>삭제</DeleteButton>
        </TodoItemContainer>
    )
}

export default TodoItem
