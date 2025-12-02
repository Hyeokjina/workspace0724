import styled from "styled-components";

export const DetailContainer = styled.div`
    max-width: 600px;
    margin: 0 auto;
    padding: 24px;
`

export const DetailCard = styled.div`
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 32px;
`

export const DetailHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    padding-bottom: 16px;
    border-bottom: 2px solid #f0f0f0;
`

export const PageTitle = styled.h1`
    font-size: 28px;
    font-weight: 700;
    color: #333;
`

export const BackButton = styled.button`
    padding: 8px 16px;
    background: #f5f5f5;
    border: none;
    border-radius: 6px;
    color: #666;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover {
        background: #e8e8e8;
        scale: 0.98;
    }
`

export const DetailBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`

export const Section = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
`

export const Label = styled.label`
    font-size: 14px;
    font-weight: 600;
    color: #666;
`

export const StatusBadge = styled.div`
    display: inline-block;
    padding: 8px 20px;
    background: ${props => props.completed ? '#ffc107' : '#f5f5f5'};
    color: ${props => props.completed ? '#000' : '#666'};
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
    width: fit-content;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover {
        opacity: 0.8;
        scale: 0.98;
    }
`

export const TextInput = styled.input`
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.2s;
    
    &:focus {
        border-color: #5833ff;
    }
`

export const CategorySelect = styled.select`
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    font-size: 16px;
    outline: none;
    background: white;
    cursor: pointer;
    transition: border-color 0.2s;
    
    &:focus {
        border-color: #5833ff;
    }
`

export const DateText = styled.div`
    padding: 12px 16px;
    background: #f9f9f9;
    border-radius: 6px;
    font-size: 14px;
    color: #666;
    text-align: center;
`

export const ActionButtons = styled.div`
    display: flex;
    gap: 12px;
    margin-top: 16px;
`

export const SaveButton = styled.button`
    flex: 1;
    padding: 14px 24px;
    background: #4285f4;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover {
        background: #3367d6;
        scale: 0.98;
    }
`

export const DeleteButton = styled.button`
    padding: 14px 24px;
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover {
        background: #c82333;
        scale: 0.98;
    }
`

export const NotFound = styled.div`
    text-align: center;
    padding: 48px 24px;
    
    h2 {
        font-size: 24px;
        color: #666;
        margin-bottom: 24px;
    }
`
