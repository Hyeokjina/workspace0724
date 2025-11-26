import React, { useState } from 'react'
import LandingPage from './LandingPage';

const TolBar = ({isLogin, onClickLogin, onClickLogout}) => {
  return (
    <div>
        {
            isLogin ?
            <div>
                <div>안녕하세요. 홍길동님</div>
                <button onClick={onClickLogout}>로그아웃</button>
            </div> :
            <div>
                <div>로그인이 필요한 서비스입니다.</div>
                <button onClick={onClickLogin}>로그인</button>
            </div>
        }
    </div>
  )
}

export default TolBar