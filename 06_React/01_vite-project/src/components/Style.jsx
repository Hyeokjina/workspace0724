import React from 'react'
import styled from 'styled-components'
import './Style.css'

const roundBoxStyle = {
    position: "absolute",
    top: 50,
    left: 50,
    width: 200,
    height: 200,
    backgroundColor: "blue",
    borderRadius: 50,  
    color: "white",
    padding: 20,
}

// styled-components 제대로 작성
const RoundBox = styled.div`
    position: absolute;
    top: ${props => props.top || 600}px;
    left: 50px;
    width: 200px;
    height: 200px;
    background-color: green;
    border-radius: 50px;
    color: white;
    padding: 20px;
`

function Style() {
  return (
    <>
        <h3>1. Object로 CSS 작성</h3>
        <p>인라인 속성이며, 재사용성이 떨어지고 코드 복잡도가 높아짐.</p>
        
        <div style={{
            position: "relative",
            width: 400,
            height: 800,
            backgroundColor: "gray",
        }}>
            <h3>2_1. css-in-js로 스타일을 직접 작성</h3>
            <div style={roundBoxStyle}>
                <p>재사용성이 가능하고 코드가 깔끔하다</p>
                <div className='highlight'>class를 활용</div>
            </div>

            <div style={{...roundBoxStyle, top: 300}}>
                <p>3. 조건부 스타일 가능</p>
                <div className={1 + 2 === 2 ? "highlight" : "highlight2"}>
                    조건부 className
                </div>
            </div>

            <RoundBox >
                <p>4. styled-components 사용</p>
                <div>컴포넌트 기반 스타일링</div>
                <p>
                    js안에서 css문법 그대로 스타일을 작성하게 해주는 라이브러리
                    특정 css가 적용된 새로운 컴포넌트를 만들어 코드의 재사용성을 높여주고
                    class명 충돌 걱정없이 사용이 가능하다..
                </p>
            </RoundBox>
        </div>
    </>
  )
}

export default Style