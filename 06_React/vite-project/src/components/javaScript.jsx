import React from 'react'

const text = "Hello, JSX";
const num = 100;

const loginUser = {
    name : "최지원",
    id : "jiwon",
    age : 10,
    info : "안녕하세요"
};

const number = [1, 2, 4, 5, 6, 12];

const imgUrl = "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTEwMjRfOTUg%2FMDAxNjM1MDc5MDM1OTQx.q6f3AgPK9AMQpQJbPJ9rRjAJj5rI83MunePcKgOtPuwg.n5thN2TXXpmGAezFBQytQcuAiwzIVQmpnPuffcXSmkMg.JPEG.cutejinju23%2FKakaoTalk_20211008_233014665_23.jpg&type=a340";

// 배열로 수정
const userList = [
    { name: "최지원", id: "jiwon1" },
    { name: "김철수", id: "kim123" },
    { name: "박영희", id: "park456" }
];

const JavaScript = () => {
  return (
    <>
        <h1>React의 JS</h1>
        
        <h2>변수 표현 방법</h2>
        <ul>
            <li>{text}</li>
            <li>{text + " Test"}</li>
        </ul>
        
        <ul>
            <li>{num}</li>
            <li>{num + 900}</li>
        </ul>
        
        <h2>Boolean 값</h2>
        <ul>
            <li>{true}</li>
            <li>{false}</li>
            <li>{null}</li>
            <li>{undefined}</li>
        </ul>

        <h2>Object, Array</h2>
        <ul>
            {Object.keys(loginUser).map((key) => 
                <li key={key}>{key} : {loginUser[key]}</li>
            )}
            <li>{number}</li>
            {[
                <li key={1}>111</li>,
                <li key={2}>222</li>,
                <li key={3}>333</li>
            ]}
        </ul>

        <h2>태그 속성에 값 넣기</h2>
        <div>
            <img src={imgUrl} alt="그림 1" width={100} />
        </div>

        <h2>조건부 렌더링</h2>
        
        <h3>삼항 연산자</h3>
        <ul>
            <li>{num > 10 ? "10 보다 큼" : "10보다 작음"}</li>
            <li>{1 + 1 === 2 ? "참이다" : "거짓이다"}</li>
        </ul>

        <h3>AND 연산자</h3>
        <ul>
            {num !== 10 && <li>num은 10이 아님</li>}
            {num === 10 && <li>num은 10임</li>}
            <li>{1 + 1 === 2 && "AND연산자 1"}</li>
            <li>{1 + 1 !== 2 && "AND연산자 2"}</li>
            {userList.length !== 0 && 
                userList.map(u => <li key={u.id}>{u.name}</li>)
            }
        </ul>

        <h3>OR 연산자</h3>
        <ul>
            {num !== 10 || <li>num은 10임</li>}
            {num === 10 || <li>num은 10이 아님</li>}
            <li>{1 + 1 === 2 || "OR연산자 1"}</li>
            <li>{1 + 1 !== 2 || "OR연산자 2"}</li>
            {userList.length === 0 || 
                userList.map(u => <li key={u.id}>{u.name}</li>)
            }
        </ul>
    </>
  )
}

export default JavaScript