import React, { useState } from 'react'


//이름과 성별을 입력받는 창을 만들고
//submit 버튼을 클릭시 이름: ~ 성별 : ~를 출력한다.
const Signup = () => {
    const [name, setName] = useState("");
    const [gender, setGender] = useState("man");

    const handelCangeNmae = (ev) => {
        setName(ev.target.value);
    }

    const handelCangeGender = (ev) => {
        setGender(ev.target.value);
    }
    
    const handleSubmit = (ev) => {
        ev.preventDefault(); //a태크나 subit같은 고유 동작을 가진 태그에 이벤트 중단해주기 위한 함수
        //onSubmit 자체에 서버로 데이터를 전송하고 페이지를 이동하는 가능이 있지만 react에서는
        //form태크 자체의 표준적인 구조는 사용하지만 이벤트기능은 SPA과는 맞지않아 사용하지 않음.

        alert(`이름 : ${name}, 성별 : ${gender}`)
    }

  return (
    <form onSubmit={handleSubmit}>
        <label>
            이름 : <input type="text" value={name} onChange={handelCangeNmae}/>
        </label>
        <br /><br />
        <label >
            성별 : 
            <select value={gender} onChange={handelCangeGender}>
                <option value="man">남자</option>
                <option value="woman">여자</option>
            </select>
        </label>
        <br /><br />
        <button type='submit'>제출</button>

    </form>
  )
}

export default Signup