import React, { useRef } from 'react' 
import styled from 'styled-components'

const Nav = styled.nav`
    position: fixed;
    top: 0;
    background: white;
    width: 100%;
    z-index: 10;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`

const NavUl = styled.ul`
    display: flex;
    gap: 12px;
    list-style: none;
    padding: 12px;
    margin: 0;
`

const NavButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    padding: 8px 16px;
    border-radius: 4px;
    
    &:hover {
        background: #f0f0f0;
    }
`

const Section = styled.section`
    padding: 100px 20px;
    min-height: 100vh;
`

const UseRefScroll = () => {

    const scrollRef = useRef({
        main: null,
        about: null,
        history: null
    })

    const handelScrollView = (key) => {
        scrollRef.current[key]?.scrollIntoView({behavior: "smooth"})
    }

    return (
        <>
            <Nav>
                <NavUl>
                    <li>
                        <NavButton onClick={() => handelScrollView("main")}>
                            메인페이지
                        </NavButton>
                    </li>
                    <li>
                        <NavButton onClick={() => handelScrollView("about")}>
                            회사소개
                        </NavButton>
                    </li>
                    <li>
                        <NavButton onClick={() => handelScrollView("history")}>
                            회사이력
                        </NavButton>
                    </li>
                </NavUl>
            </Nav>

            <Section ref={(el) => scrollRef.current.main = el}>
                <h1>메인페이지</h1>
                <p>
                    예선 1위(농아인 세계신기록 570점, 종전 김태영의 561점 경신)에 이어 
                    결선에서도 농아인 세계신기록인 33개의 히트를 기록하며 금메달을 차지했다.
                    <br /><br />
                    지난 23일 남자 25m 권총에서 은메달에 이어 이번 대회 첫 금메달을 추가한 
                    이승화는 "말로 다 할 수 없을 만큼 기쁘다"며 "치료를 도와준 의무팀과 
                    현장에서 함께한 스포츠과학팀, 감독님과 코치님, 수어통역사분들께 감사드린다. 
                    무엇보다 늘 응원해준 사랑하는 가족에게 감사하다"고 소감을 밝혔다. 
                    같은 종목에 출전한 김태영(25·대구시설관리공단)은 결선에서 3위로 동메달을 추가했다.
                </p>
            </Section>

            <Section ref={(el) => scrollRef.current.about = el}>
                <h1>회사소개</h1>
                <p>
                    예선 1위(농아인 세계신기록 570점, 종전 김태영의 561점 경신)에 이어 
                    결선에서도 농아인 세계신기록인 33개의 히트를 기록하며 금메달을 차지했다.
                    <br /><br />
                    지난 23일 남자 25m 권총에서 은메달에 이어 이번 대회 첫 금메달을 추가한 
                    이승화는 "말로 다 할 수 없을 만큼 기쁘다"며 "치료를 도와준 의무팀과 
                    현장에서 함께한 스포츠과학팀, 감독님과 코치님, 수어통역사분들께 감사드린다. 
                    무엇보다 늘 응원해준 사랑하는 가족에게 감사하다"고 소감을 밝혔다. 
                    같은 종목에 출전한 김태영(25·대구시설관리공단)은 결선에서 3위로 동메달을 추가했다.
                </p>
            </Section>

            <Section ref={(el) => scrollRef.current.history = el}>
                <h1>회사이력</h1>
                <p>
                    예선 1위(농아인 세계신기록 570점, 종전 김태영의 561점 경신)에 이어 
                    결선에서도 농아인 세계신기록인 33개의 히트를 기록하며 금메달을 차지했다.
                    <br /><br />
                    지난 23일 남자 25m 권총에서 은메달에 이어 이번 대회 첫 금메달을 추가한 
                    이승화는 "말로 다 할 수 없을 만큼 기쁘다"며 "치료를 도와준 의무팀과 
                    현장에서 함께한 스포츠과학팀, 감독님과 코치님, 수어통역사분들께 감사드린다. 
                    무엇보다 늘 응원해준 사랑하는 가족에게 감사하다"고 소감을 밝혔다. 
                    같은 종목에 출전한 김태영(25·대구시설관리공단)은 결선에서 3위로 동메달을 추가했다.
                </p>
            </Section>
        </>
    )
}

export default UseRefScroll