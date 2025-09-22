
//자료형, 목적에 따라 가장 간결하고 명확하게 구현하기 위한 다양한 반복문이 존재.
//일기/변환/필터링/검색... 목적에 맞는 반복문을 골라 사용해야 가독성 높아짐.

let members = [ 
    "최지원",
    "김지원",
    "이지원",
    "박지원",
    "정지원",
    "황지원",
]

console.log(members.push("신지원"));
console.log(members);

//splice(인덱스, 몇개) -> 원본에서 특정 인덱스부터 n개를 잘라냄.
console.log(members.splice(1,3));
console.log(members)

//slice(인덱스, 마지막 인덱스 -1) -> 원본에서 특정 인덱스부터 마지막 인덱스 -1개를 추출함.
console.log(members.slice(0,3));
console.log(members);

//...배열 또는 ...객체 -> spread연산자
//배열이나 객체 요소를 개별적으로 펼쳐서 복사하거나 전달할 때 사용.
members = [ 
    "최지원",
    "김지원",
    "이지원",
    "박지원",
    "정지원",
    "황지원",
]

//값을 복사할 떄
let members2 = [
    ...members,
    "신지원"
]
console.log(members2);


let choi = {
    name: "jiwon",
    age: 24,
    gender: "남"
};

//값을 수정할 때
 choi = {
    ...choi,
    gender: "여"
};
console.log(choi);

//데이터를 추가할 때
 choi = {
    ...choi,
    address: "경기도 광명시"
};
console.log(choi);


//비구조할당
//배열이나 객체에서 값을 추출할 때 개별변수에 할당해서 추출하는 문법
members = [
    "최지원",
    "김지원",
    "이지원"
];

// const cho = members[0];
// const kim = members[1];
// const lee = members[2];
const [cho, lee, kim] = members;
console.log(cho,lee,kim);

choi = {
    name: "jiwon",
    age: 24,
    gender: "남"
};

const {name, age} = choi;
console.log(name);
console.log(age);

// const userName = choi.name;
// const userAge = choi.age;
const{name:userName, age:userAge} = choi;
console.log(userName);
console.log(userAge);

//join(구분자) -> 배열을 문자열로 변경해줌.
console.log(members);
console.log(members.join());
console.log(members.join("/"));

//reverse() -> 배열을 지금상태에서 역순으로 졍렬
console.log(members2);
members2.reverse(); //역순으로
console.log(members2);

//sort()
console.log(members2);
members2.sort(); //오름차순 정렬
console.log(members2);
members2.sort().reverse(); //내림차순
console.log(members2);
