--1.영어영문학과(학과코드 002)학생들의 학번과 이름, 입학 년도를 입학 년도가 빠른 순으로 표시
--학번,이름,입학년도조회
SELECT STUDENT_NO ,STUDENT_NAME ,ENTRANCE_DATE 
FROM TB_STUDENT
WHERE DEPARTMENT_NO = '002'
ORDER  BY  ENTRANCE_DATE ASC;

--2.춘 기술대학교의 교수 중 이름이 세글자가 아닌 교수가 한 명 있다고 한다. 그 교수의 이름과
--주민번호를 화면에 출력하라
SELECT PROFESSOR_NAME,PROFESSOR_SSN
FROM TB_PROFESSOR
WHERE PROFESSOR_NAME NOT LIKE '___'; 

--3.춘 기술대학교의 남자 교수들의 이름과 나이를 출력 다, 나이가 적은순서 부터
SELECT PROFESSOR_NAME,
       FLOOR(MONTHS_BETWEEN(SYSDATE, TO_DATE('19'||SUBSTR(PROFESSOR_SSN, 1, 6), 'YYMMDD')) / 12) AS 나이
FROM TB_PROFESSOR
ORDER BY 나이 ASC
;

SELECT PROFESSOR_NAME 교수이름, EXTRACT(YEAR FROM SYSDATE) - (19 || SUBSTR(PROFESSOR_SSN, 1, 2)) 나이
FROM TB_PROFESSOR
WHERE SUBSTR(PROFESSOR_SSN, 8, 1) = 1
ORDER BY 나이;
--4.교수들의 이름 중 성을 제외한 이름만 출력(성이2자는 없다)
SELECT SUBSTR(PROFESSOR_NAME,2,2)
FROM TB_PROFESSOR;


--5.춘 기술대학교의 재수생 입학자를 구하려고 한다. 이때 19살에 입학하면 재수를 하지 않은 것으로 간주
SELECT STUDENT_NO, STUDENT_NAME      
FROM TB_STUDENT
WHERE FLOOR(MONTHS_BETWEEN(ENTRANCE_DATE,
                           TO_DATE('19' || SUBSTR(STUDENT_SSN, 1, 6), 'YYMMDD')) / 12) > 19;
                           
                           
--6.2020년 크리스마스는 무슨 요일인가?
SELECT TO_CHAR(TO_DATE('2020/12/25','YY/MM/DD'),'DAY')
FROM DUAL;

--7.TO_DATE('99/10/11,YY/MM/DD'),TO_DATE('49/10/11','YY/MM/DD')은 각각 몇년 몇월 몇일을 의미하는가?
--또TO_DATE('99/10/11','RR/MM/DD'),TO_DATE('99/10/11','RR/MM/DD')
SELECT TO_CHAR(TO_DATE('99/10/11','YY/MM/DD'),'YYYY')||'년'||
       TO_CHAR(TO_DATE('99/10/11','YY/MM/DD'),'MONTH')||
       TO_CHAR(TO_DATE('99/10/11','YY/MM/DD'),'DD')||'일'AS 날짜1,
       
       TO_CHAR(TO_DATE('49/10/11','YY/MM/DD'),'YYYY')||'년'||
       TO_CHAR(TO_DATE('49/10/11','YY/MM/DD'),'MONTH')||
       TO_CHAR(TO_DATE('49/10/11','YY/MM/DD'),'DD')||'일'AS 날짜2,
       
       TO_CHAR(TO_DATE('99/10/11','RR/MM/DD'),'RRRR')||'년'||
       TO_CHAR(TO_DATE('99/10/11','RR/MM/DD'),'MONTH')||
       TO_CHAR(TO_DATE('99/10/11','RR/MM/DD'),'DD')||'일'AS 날짜3,
       
       TO_CHAR(TO_DATE('99/10/11','RR/MM/DD'),'RRRR')||'년'||
       TO_CHAR(TO_DATE('99/10/11','RR/MM/DD'),'MONTH')||
       TO_CHAR(TO_DATE('99/10/11','RR/MM/DD'),'DD')||'일'AS 날짜4
FROM DUAL;                           
                          
--8.춘 기술대학교의 2020년도 이후 입학자들은 학번이 A로 시작하게 되어있다 2020년도 이전 학번
--을 받은 학생들의 학번과 이름을 출력
SELECT STUDENT_NO ,STUDENT_NAME
FROM TB_STUDENT
WHERE NOT STUDENT_NO LIKE 'A%' ;

--9.학번이 A517178인 한아름 학생의 학점 총 평점을 구해라
SELECT ROUND(AVG(POINT), 1)
FROM TB_GRADE
WHERE STUDENT_NO = 'A517178';
                           

--10. 학과별 학생수를 구하여"학과번호","학생수(명)"의 형태로 출력
SELECT DEPARTMENT_NO, COUNT(DEPARTMENT_NO)AS "학생수(명)"
FROM TB_STUDENT
GROUP BY DEPARTMENT_NO
ORDER BY 1;


--11 지도교수를 배정 받지 못한 학생수
SELECT COUNT(*)
FROM TB_STUDENT
WHERE COACH_PROFESSOR_NO IS NULL;

--12. 학번이 A112113인 김고은 학생의 년도 별 평점을 구해라
SELECT SUBSTR(TERM_NO,1,4)AS "년도",ROUND(AVG(POINT),1)AS "년도 별 평점"
FROM TB_GRADE
WHERE STUDENT_NO='A112113'
GROUP BY SUBSTR(TERM_NO,1,4);

--13.학과 별 휴학생 수를 파악하고자 한다. 학과 번호와 휴학생 수를 표시해라
SELECT DEPARTMENT_NO 학과코드명, COUNT(DECODE(ABSENCE_YN, 'Y', 1)) "휴학생 수"
FROM TB_STUDENT
GROUP BY DEPARTMENT_NO
ORDER BY 1;

--14.춘 대학교에 다니는 동명이인 학생들의 이름을 조회
SELECT STUDENT_NAME AS "동일이름", COUNT(STUDENT_NAME) AS"동명인 수"
FROM tb_student
GROUP BY STUDENT_NAME
HAVING COUNT(STUDENT_NAME)>=2;

--15.학번이 A112113인 김고은 학생의 학기 별 평점과 년도 별 누적 평점, 총평점을 구하라
-- 학기별 평점
SELECT SUBSTR(TERM_NO, 1, 4) 년도, SUBSTR(TERM_NO, 5, 2) 학기, ROUND(AVG(POINT), 1) 평균
FROM TB_GRADE
WHERE STUDENT_NO = 'A112113'
GROUP BY ROLLUP(SUBSTR(TERM_NO, 1, 4), SUBSTR(TERM_NO, 5, 2))
ORDER BY 1; 