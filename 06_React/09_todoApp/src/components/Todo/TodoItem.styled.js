import styled from "styled-components"

export const TodoItemContainer = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border: 1px solid #e3e3e3;
    border-radius: 4px;
    margin-bottom: 8px;
    background: white;
`

export const TodoText = styled(Link)`
    text-decoration: ${props => props.completed ? 'line-through' : 'none'};
    color: ${props => props.completed ? '#999' : '#037e21ff'};
    cursor: pointer;
    transition: all 0.2s;

    &:hover{
        transform: scale(0.98);
    }
`

export const Checkbox = styled.input`
`

export const DeleteButton = styled.button`
    color: #bb1111ff;
    background: none;
    border: none;
    cursor: pointer;
    outline: none;
    padding: 4px 8px;
    
    &:hover{
        transform: scale(0.98);  
    }
`