import React, { useMemo } from 'react'  


const ViewState = ({ num }) => {
    
    const getHeavyResult = (value) => {
        console.log("연산실행")  
        let i = 0;
        while(i < 10000000) i++;
        return value + i;
    }

    // useMemo로 최적화
    const result = useMemo(() => {
        return getHeavyResult(num);
    }, [num]);

    return (
        <div style={{marginTop: '20px', padding: '20px', background: '#f0f0f0'}}>
            <p>현재숫자 : {num}</p>
            <p>계산된 값 : {result}</p>
        </div>
    )
}

export default ViewState