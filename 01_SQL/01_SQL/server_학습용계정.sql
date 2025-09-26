--DEPARTMENT 테이블의 모든 정보 조회
SELECT * 
FROM DEPARTMENT;

--ENPLOYEE테이블에서 이름 ,연봉 총수령액 , 실수령액(총수령액 - 연봉*세금3프로 조회
SELECT EMP_NAME,SALARY*12,(SALARY + (SALARY*NVL(BONUS,0)))*12 "총수령액",
       (SALARY + (SALARY*NVL(BONUS,0)))*12-(SALARY*12*0.03) AS "실수령액"
FROM EMPLOYEE;



/*
    테이블
    -데이터베이스에서 데이터를 저장하는 기본개념
    -행과 열로 구성된 데이터 집합
    
    컬럼
    -테이블 내의 각 데이터 속성을 정의하는 필드
    - 컬럼은 테이블에서 저장 할 때 속성= 값으로 저장
    
    => 테이블은 여러 칼럼으로 구성되고, 각 컬럼은 테이블이 표현하는 데이터의 세부적인 속성을 나타낸다.
    
    사용코드
    <SELECT>
    SELECT 컬럼명1, 컬럼명2....
    FROM 테이블명
    [WHERE 조건] EX 수령액이 1억이상
    [ORDER BY 정렬기준] 
*/

--데이터베이스에서 NULL은 빈값을 의미한다.
--모든 연산에 NULL이 포함된 경우, 결과는 NULL이된다.

--사원명, 입사일, 근무일수를 EMPLOYEE테이블에서 조회
--데이터베이스에서 날자를 계산할 때 덧셈 뺄셈이 가능하다.
--현재시간-입사일=근무시간
--DATE-DATE=> 결과를 무조건 일로 표시한다.
--코드실행시 현재날짜를 표시하는 상수 : SYSDATE[년월,일,시,분,초]
SELECT EMP_NAME, HIRE_DATE, SYSDATE - HIRE_DATE
FROM EMPLOYEE;

--DUAL테이블은 오라클에서 제공하는 가상 테이블이다.
SELECT SYSDATE FORM DUAL;

/*
   <컬럼별칭>
   컬럼명에 별칭을 부여하면 깔끔하게 표현할 수 있다.
   [표현식]
   컬럼명 별칭/ 컬럼명 AS 별칭/ 컬럼명 "별칭"
*/

SELECT EMP_NAME 사원명, SALARY AS 급여, BONUS"보너스",SALARY*12 AS "연봉"
FROM EMPLOYEE;

/*
    <리터럴>
    직접 값을 나타내는 단위, 임의로 지정한 값
*/
SELECT EMP_ID, EMP_NAME, SALARY, '원'
FROM EMPLOYEE;
/*
  <연결연산자 :||>
  여러 컬럼 값들을 마치 하나의 컬럼처럼 연결할 수 있다.
*/
SELECT EMP_NAME||'님 급여는' || SALARY||'원'
FROM EMPLOYEE;

/*
    <DISTINCT>
    중복제거 - 컬럼에 표시된 값들을 한번씩만 조회하고자 할 때 사용
*/

--실제로 사용되고 있는 직급 목록
SELECT DISTINCT JOB_CODE
FROM EMPLOYEE;

--실제로 사용되고 있는 부서 목록d
SELECT DISTINCT DEPT_CODE
FROM EMPLOYEE;

/*SELECT DISTINCT EMP_NAME,DISTINCT JOB_CODE,DISTINCT DEPT_CODE
FROM EMPLOYEE; 
위처럼 사용하면 에러가 발생한다 DISTINCT는 한 명령어에 한번만 사용가능하다.
*/

--DISTINCT는 항상 ROW데이터 전체에 대해서 중복을 제거한다. 즉 전체 행이 모두 같아야 한다는 말
SELECT DISTINCT JOB_CODE, DEPT_CODE
FROM  EMPLOYEE;
--위처럼 사용시 (JOB_CODE, DEPT_CODE)를 쌍으로 묶어서 중복을 제거한 값을 보여준다.

==================================================================================
/*
    <WHERE 절>
    조회하고자하는 테이블로부터 특정 조건에 만족하는 데이터만 조회하고자 할 때 사용함.
    조건식에서도 다양한 연산자를 사용 할 수있다.
    
    [표현법]
    SELECT 컬럼, 컬럼,....
    FROM 테이블명
    WHERE 조건;
    
    >>비교연산자<<
    >,<,>=,<=, : 대소비교
    = : 양쪽이 같다.
    !=, ^=,<> : 양쪽이 다르다.
*/

--EMPLOYEE테이블에서 부서코드가 D9인 사람들만 조회하기(모든칼럼)
SELECT *
FROM EMPLOYEE
WHERE DEPT_CODE = 'D9';

--EMPLOYEE에서 부서코드가 D1가 아닌 사원들의 사원명, 급여, 부서코드 조회
SELECT EMP_NAME, SALARY ,DEPT_CODE
FROM EMPLOYEE
WHERE DEPT_CODE !='D1';

--월급이 400만원 이상인 사원들의 사원명, 부서코드, 급여 조회
SELECT EMP_NAME, DEPT_CODE, SALARY
FROM EMPLOYEE
WHERE SALARY >= 4000000;

/*
   <AND, OR 연산자>
   조건을 여러개 연결할 때 사용한다.
   [표현법]
   조건 A AND 조건 B -> 조건A와 조건B가 모두 만족하는 값만 참으로 한다.
   조건 A OR 조건 B -> 조건A와 조건B가 하나만 만족하는 값만 참으로 한다.
   
   <BETWEEN AND>
   조건식에 사용되는 구문
   몇이상 몇이하인 범위에 대한 조건을 제시할 때 주로 사용하는 연산자(이상,이하만 가능)
   [표현법 ]
   비교대상 컬럼 BETWEEN 하한값 AND 상한값;
*/

--급여가 350만원 이상 600만원 이하인 모든 사원의 사원명, 사번, 급여 조회
SELECT EMP_NAME, EMP_ID, SALARY
FROM EMPLOYEE
WHERE SALARY>=3500000 AND SALARY<=6000000;

/*
   NOT : 논리부정 연산자
   컬럼명 앞에 또는 BETWEEN 앞에 선언 가능
*/
SELECT EMP_NAME, EMP_ID, SALARY
FROM EMPLOYEE
WHERE NOT SALARY BETWEEN 3500000 AND 6000000; --위 식과 정반대 값이 나온다.

--입사일이 '90/01/01' 이상 '01/01/01'이하인 사원들을 조회
SELECT *
--WHERE HIRE_DATE >= '90/01/01' AND HIRE_DATE <='01/01/01';
WHERE HIRE_DATE BETWEEN'90/01/01' AND <='01/01/01';
FROM EMPLOYEE

--NULL을 비교연산 할때 =을 사용할수 없다.
--NULL 값을 비교할 때는 IS NULL, IS NOT NULL을 사용한다.
SELECT *
FROM EMPLOYEE
WHERE BONUS IS NOT NULL;

























