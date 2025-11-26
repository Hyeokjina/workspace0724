import React, { useState } from 'react'

const UseStateTest = () => {
    //const num = 0;
    const [num,setNum] = useState(0);

    const onClickPlus = () => {
        setNum(num+1);
    }

    const onClickMInus = () => {
        setNum(num-1);
    }

  return (
    <div>
        <div>COUNT : {num}</div>
        <button onClick={onClickPlus}> + </button>
        <button onClick={onClickMInus}> - </button>
    </div>
  )
}

export default UseStateTest