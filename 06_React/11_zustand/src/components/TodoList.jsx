import React from 'react'
import { CheckBox, DeleteButton, FilterContainer, ListContainer, NomalButton, TodoItem, TodoText } from './TodoList.styled'
import useTodoStore from '../store/useTodoStore'



const TodoList = () => {
    
    const {getFilteredTodos, setFilter, toggleTodo, deleteTodo} = useTodoStore();
  
    const todos = getFilteredTodos()
    return (
    <ListContainer>
        <FilterContainer>
            <NomalButton
                onClick={()=> setFilter('all')}
            >
                전체
            </NomalButton>
            <NomalButton
                onClick={()=> setFilter('active')}
                >
                진행중
            </NomalButton>
            <NomalButton
                onClick={()=> setFilter('completed')}>
                완료
            </NomalButton>
        </FilterContainer>
        {todos.map(todo => (
            <TodoItem key={todo.id}>
                <CheckBox 
                    type='checkbox'
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                />
                <TodoText completed={todo.completed}>{todo.text}</TodoText>
                <DeleteButton onClick={() => deleteTodo(todo.id)}>삭제</DeleteButton>
            </TodoItem>
        ))}
    </ListContainer>
  )
}

export default TodoList