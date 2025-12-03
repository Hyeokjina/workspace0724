import styled from "styled-components";

export const ListContainer = styled.div`
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
`

export const TodoItem = styled.div`
    display: flex;
    align-items: center;
    padding: 12px;
    margin: 8px 0;
    border-radius: 4px;
`

export const CheckBox = styled.input`
    margin-right: 12px;
    width: 18px;
    height: 18px;
    cursor: pointer;
`

export const TodoText = styled.span`
    flex: 1;
    text-decoration: ${props => props.completed ? "line-through" : "none"};
`
export const NomalButton = styled.button`
    padding: 6px 12px;
    background: blue;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    &:hove{
        scale: 0.9;
    }
`


export const DeleteButton = styled(NomalButton)`
    background: red;
`
export const FilterContainer = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    justify-content: center;
`

export const FIlterButton = styled.button`
    padding: 6px, 12px;
    color: white;
    background: white;
    border-radius: 4px;
    cursor: pointer;
        
    &:hove{
        scale: 0.9;
    }
`