import React, { useState } from 'react'  // useState 추가!

const UseRefTest = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("man");

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
      document.getElementById('name-input').focus();  // 수정!
  }

  return (
    <form onSubmit={handleSubmit}>
        <label>
            이름 : <input 
                type="text" 
                id='name-input'
                value={name} 
                onChange={handelCangeNmae}
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