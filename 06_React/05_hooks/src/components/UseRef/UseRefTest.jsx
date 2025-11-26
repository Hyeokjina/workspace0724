import React, { useEffect, useState } from 'react'

const UseRefTest = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("man");

  const useInput = useRef(null);

  const handelCangeNmae = (ev) => {
      setName(ev.target.value);
  }

  const handelCangeGender = (ev) => {
      setGender(ev.target.value);
  }
  
  const handleSubmit = (ev) => {
      ev.preventDefault(); 
      alert(`이름 : ${name}, 성별 : ${gender}`)
  }

  const handelReset = () => {
      setGender("man");
      setName("");
      //document.getElementById('name-input').focus();

      useInput.current?.focus();
      //DOM 직접 탐색없이 React가 input을 참조하게 한다.
  }

  return (
    <form onSubmit={handleSubmit}>
        <label>
            이름 : <input 
                type="text" 
                id='name-input'
                value={name} 
                onChange={handelCangeNmae}
                ref={useInput}
            />
        </label>
        <br /><br />
        <label>
            성별 : 
            <select value={gender} onChange={handelCangeGender}>
                <option value="man">남자</option>
                <option value="woman">여자</option>
            </select>
        </label>
        <br /><br />
        <button type='submit'>제출</button>
        <button type='button' onClick={handelReset}>초기화</button>
    </form>
  )
}

export default UseRefTest