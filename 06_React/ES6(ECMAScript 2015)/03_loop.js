//1. for문 
for(let i=0; i<5; i++){
    console.log("for in i : ", i);
}

//2. while문
let j =0;
while(j<5) {
    console.log("for in j :", j);
    j++;
}

//3. do while문
j =0;
do {
    console.log("for in j :", j);
    j++;
}while(j<5);

//4. for ...in
const apple = {
    id: 4,
    name: "사과",
    price: 1500
}

for(let k in apple){
    console.log(k+" : "+ apple[k]);
}

const fruits = [{ 
            id: 1,
            name :"사과",
            price: 3000}
            ,{ 
            id: 2,
            name :"감",
            price: 3000}
            ,{ 
            id: 3,
            name :"배",
            price: 3000}
            ,{ 
            id: 4,
            name :"바나나",
            price: 3000}
            ];

//4.for ...of
for (const fruit of fruits){
    console.log(fruit);
}

for (const fruit of fruits){
    console.log(fruit.id + " : " + fruit.name);
}

//5. forEach
//-배열 순회 전용 메서드
fruits.forEach((fruit, index) => {
    console.log(`forEach : ${index} -> ${fruit.name}`);
})

const numbers = [1,3,5,7,9];

//6.map()
//기존배열을 가지고 새로운 배열을 만들고 싶을 때 -> 변형된 새로운 배열을 반환
//서버로 부터 받은 데이터를 통해서 대칭되는 UI를 만들어 낼 떄 사용
//[1, 9, 25 ...]
const squared = numbers.map((num) => num*num); //내부 함수에 리턴값을 통한 새로운 배열을 반환.
console.log(`map의 결과 : ${squared}`);

//7. filter()
// 조건에 맞는 요소만 추출하고 싶을 떄 -> 조건에 맞는 값만 모아서 새로운 배열을 반환
// [3,9]
const squared2 = numbers.filter((num) => num % 3 === 0);//내부 함수의 리턴값이 true인 것만 모아서 반환
console.log(`filter의 결과 : ${squared2}`);