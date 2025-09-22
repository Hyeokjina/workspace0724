/*
    클로저란?
    클로저는 함수와, 그 함수가 선던된 시점의 시점의 렉시컬 환경의 조합.
    즉, 내부 함수의 선언시점의 외부함수의 변수를 함께 저장해서 사용하는 것을 클로저라고 함.
    콜백/이벤트 핸들러/모듈패턴에서 핵심적인 역활을 함.
*/

function getCounter(){
    //count는 getCounter영역에 선언된 변수
    let count = 0;

    function increase(){
        count++;
        return count;
    }

    return increase;//내부함수를 반환 -> 외부에서도 count에 접근이 가능
}

const run = getCounter();
console.log(run());