DROP TABLE Patient;

CREATE TABLE Patient (
patientid  NUMBER(2) PRIMARY KEY,
patientname VARCHAR2(40),
dept VARCHAR2(40),
age NUMBER(8)
);

INSERT INTO Patient VALUES(1, '임종숙','가정의학과', 52);
INSERT INTO Patient VALUES(2, '김은수','감염내과', 45);
INSERT INTO Patient VALUES(3, '최은영','류마티스내과', 32);
INSERT INTO Patient VALUES(4, '김종국','정형외과', 49);
INSERT INTO Patient VALUES(5, '서종라','산부인과', 36);
INSERT INTO Patient VALUES(6, '이상범','신경과', 72);
INSERT INTO Patient VALUES(7, '유동수','신장내과', 51);
INSERT INTO Patient VALUES(8, '김민섭','가정의학과', 24);
INSERT INTO Patient VALUES(9, '이유진','피부과', 39);
INSERT INTO Patient VALUES(10, '송호성','소화기내과', 64);


select * from Patient;


COMMIT;


//1. Patient테이블에서 김종국의 진료과를 찾으시오
SELECT dept
FROM Patient
WHERE patientname = '김종국';

 

//2. Patient테이블에서 모든 환자의 이름과 나이를 검색하시오.
SELECT patientname, age
FROM Patient;

 

//3. Patient테이블에서 DISTINCT 키워드 사용하여 모든 진료과를 검색하시오.
SELECT DISTINCT dept
FROM Patient;

 

//4. Patient테이블에서 나이가 30 이상 45 이하인 환자의 모든 속성을 검색하시오.
SELECT *
FROM Patient
WHERE age BETWEEN 30 AND 45;

 

//5. Patient테이블에서 진료과가 ‘가정의학과’ 혹은 ‘정형외과’인 도서의 모든 속성을 검색하시오.
SELECT *
FROM Patient
WHERE dept IN ('가정의학과', '정형외과');

 

//6. Patient테이블에서 진료과 이름에 ‘외과’가 포함된 환자이름과 진료과를 검색하시오.
SELECT patientname, dept
FROM Patient
WHERE dept LIKE '%외과%';

 

//7. Patient테이블에서 진료과(dept) 기준 오름차순으로 환자이름과 진료과를 검색하시오.
SELECT patientname, dept
FROM Patient
ORDER BY dept ASC;

 

//8. NOT IN 키워드 명령어를 사용하여 Patient테이블에서 ‘신경과’ 혹은 ‘피부과’가 아닌 부서의 모든 속성을 검색하시오.
SELECT *
FROM Patient
WHERE dept NOT IN ('신경과', '피부과');

 

//9. Patient테이블에서 환자이름이 ‘김’으로 시작하는 환자의 모든 속성을 검색하시오.
SELECT *
FROM Patient
WHERE patientname LIKE '김%';

 

//10. Patient테이블에서 진료과가 ‘내과’로 끝나는 모든 환자들 중에서 나이가 50 이상인 환자의 모든 속성을 검색하시오.
//(LIKE 키워드 사용하여 dept 속성에서 내과로 끝나는 모든 진료과를 찾을 것)
SELECT *
FROM Patient
WHERE dept LIKE '%내과'
  AND age >= 50;
