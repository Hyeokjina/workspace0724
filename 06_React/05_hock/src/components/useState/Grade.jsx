import React from 'react'

const Grade = ({isLogin}) => {  // props 받기!
    return (
        <div>
            {
                isLogin && <div>골드등급</div>
            }
        </div>
    )
}

export default Grade