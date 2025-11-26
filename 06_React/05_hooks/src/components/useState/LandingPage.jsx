import React, { useState } from 'react'
import TolBar from './ToolBar'
import Grade from './Grade'

const LandingPage = () => {
    const [isLogin, setIsLogin] = useState(false);

    const onClickLogin = () => {  
        setIsLogin(true);
    }

    const onClickLogout = () => {  
        setIsLogin(false);
    }

    return (
        <div>
            <TolBar 
                isLogin={isLogin}
                onClickLogin={onClickLogin}    
                onClickLogout={onClickLogout}
            />
            <Grade isLogin={isLogin} />
        </div>
    )
}

export default LandingPage