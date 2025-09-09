--1. 춘 기술대학교의 학과 이름과 계열을 표시 하시요
SELECT DEPARTMENT_NAME AS "학과명", CATEGORY AS "계열"
FROM TB_DEPARTMENT;


--2.학과의 학과 정원을 다음과 같은 형태로 화면에 출력한다.
SELECT DEPARTMENT_NAME || '의 정원은' || CAPACITY ||'입니다.' AS "학과별 정원"
FROM TB_DEPARTMENT;


--3.국어국문학과에 다니는 여학생중 현재 휴학중인 여학생을 찾아라
SELECT STUDENT_NAME
FROM TB_STUDENT
WHERE SUBSTR(STUDENT_SSN, 8, 1) = 2
      AND ABSENCE_YN = 'Y'
      AND DEPARTMENT_NO = (SELECT DEPARTMENT_NO
                           FROM TB_DEPARTMENT
                           WHERE DEPARTMENT_NAME = '국어국문학과');

--4.도서관에서 대출 도서 장기 연체자들을 찾아 아름을 게시하고자 한다. 그 대사장자들의 학번이
-- A513079, A513090,A513091,A513110,A513119와 같을 때 대상자들을 찾는 구문 만들기
SELECT STUDENT_NAME,STUDENT_NO
FROM tb_student
WHERE STUDENT_NO IN ('A513079', 'A513090','A513091','A513110','A513119');



--5. 입학정원이 20명 이상 30명 이하인 학과들의 학과이름과 계열을 출력하시오.
SELECT DEPARTMENT_NAME,CATEGORY
FROM TB_DEPARTMENT
WHERE CAPACITY BETWEEN 20 AND 30;


--6.춘 기술대학교는 총장을 제외하고 모든 교수들이 소속 학과를 가지고 있다. 그럼 춘기술대학교
--총장의 이름을 알아낼수 있는 문장을 작성하시오
SELECT PROFESSOR_NAME
FROM tb_professor
WHERE DEPARTMENT_NO IS NULL;

--7.혹시 전산상의 착오로 학과가 지정되어 있지 않은 학생이 있는지 확인하는 문장
SELECT STUDENT_NAME, DEPARTMENT_NO
FROM TB_STUDENT
WHERE DEPARTMENT_NO IS NULL;


--8.수강신청을 하려고한다. 선수과목 여부를 확인해야하는데 선수과목이 존재하는 과목들은 무엇인지
--과목번호 조회
SELECT CLASS_NO
FROM TB_CLASS
WHERE PREATTENDING_CLASS_NO IS NOT NULL;

--9.춘 대학에는 어떤 계열들이 있는지 조회
SELECT DISTINCT(CATEGORY)
FROM TB_DEPARTMENT
ORDER BY 1;

--10. 02학번 전주 거주자들의 모임을 만들려고 한다. 휴학한 사람들을 제외한 재학중인 학생들의
-- 학번, 이름 ,주민번호를 조회

SELECT STUDENT_NO, STUDENT_NAME, STUDENT_SSN, STUDENT_ADDRESS
FROM TB_STUDENT
WHERE SUBSTR(ENTRANCE_DATE,1,2)='02'
      AND STUDENT_ADDRESS LIKE '%전주%'
      AND ABSENCE_YN = 'N';




