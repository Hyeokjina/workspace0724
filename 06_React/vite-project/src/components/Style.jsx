import React from 'react'
import './Style.css'

const roundBoxStyle = {
            position: "absolute",
            top: 50,
            left: 50,
            width: 200,
            height: 200,
            backgroundColor: "blue",
            boarderRadius: 50,
            color: "white",
}


function Style() {
  return (
    <>
        <h3>1. Object로 css작성</h3>
        <p>인라인 속성이며, 재사용성이 떨어지고 코드 복잡도가 높아짐.</p>
        <div style={{
            position: "relative",
            width: 400,
            height: 1500,
            backgroundColor: "gray",
        }}>

            <h3>2_1. css-in-js로 스타일을 직접 작성</h3>
            <div style={roundBoxStyle}>
                <p>재사용성이 가능하고 코드가 깔끔하다, 기존 css기능 사용이 불가하고 체계적이지 못하다</p>
                <div className='highlight'>class를 활용</div>
            </div>
            <div style={{...roundBoxStyle, top : 300}}>
                <p>3.조건부 스타일 가능</p>
                <div className={1+1 !== 2 && "highlight"}>class를 활용 </div>
            </div>
        </div>
    </>
  )
}

export default Style