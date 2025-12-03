import React from 'react'
import styled from 'styled-components'
import useCounterStore from '../store/useCounterStore'

const Button = styled.button`
    padding: 8px 16px;
    border: none;
    background: #3c3cd3;
    color: white;
    cursor: pointer;
    margin-right: 12px;

    &:hover{
        scale: 0.98;
    }


`

const CounterController = () => {
    const {increase,decrease,reset } = useCounterStore();
  return (
    <div>
        <Button onClick={increase}> + 1 </Button>
        <Button onClick={decrease}> - 1 </Button>
        <Button onClick={reset}> 초기화 </Button>

    </div>
  )
}

export default CounterController