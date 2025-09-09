--1. 강의별 수강생 수 구하기
--각 강의 제목별로 수강한 수강생 수를 조회하시오.
--단, 수강생이 1명 이상인 강의만 조회하고, 수강생 수가 많은 순으로 정렬하시오.
SELECT TITLE, INDEX_COUNT
FROM LECTURE
ORDER BY 2 DESC;


--2. 특정 학생의 수강 내역 조회
--STUDENT_ID = 990인 학생이 수강 중인 강의 제목, 강사 이름, 수강 상태를 조회하시오.
--수강 상태가 'Y'인 항목만 출력합니다
SELECT 
    L.TITLE AS 강의제목,
    T.NAME AS 강사이름,
    E.STATUS AS 수강상태
FROM ENROLLMENT E
JOIN STUDENT S ON E.STUDENT_ID = S.STUDENT_ID
JOIN LECTURE L ON E.LECTURE_ID = L.LECTURE_ID
JOIN TEACHER T ON L.TEACHER_ID = T.TEACHER_ID
WHERE E.STUDENT_ID = 990 AND E.STATUS = 'Y';


--3.전공별 강의 개수 집계
--TEACHER 테이블의 전공(SUBJECT)별로 담당 중인 강의 개수를 구하시오.
--강의가 없는 전공은 제외하고, 결과를 전공명 기준으로 오름차순 정렬하세요.
SELECT SUBJECT AS전공, COUNT(TITLE)AS 강의개수
FROM TEACHER
JOIN LECTURE USING (TEACHER_ID)
GROUP BY TEACHER_ID,SUBJECT
ORDER BY 2 ASC ;

--4. 평균 점수가 80점 이상인 강의만 조회
--각 강의별 수강생들의 GRADE_SCORE 평균을 계산한 후,
--평균 점수가 80점 이상인 강의의 제목과 평균 점수를 조회하시오.
--점수는 소수점 첫째 자리까지 출력하고, 평균 점수 내림차순으로 정렬하세요.
SELECT LECTURE_ID AS 강의코드, TITLE AS 강의이름, ROUND(AVG(GRADE_SCORE),1)
        FROM ENROLLMENT
        JOIN LECTURE USING (LECTURE_ID)
        GROUP BY LECTURE_ID,TITLE
        HAVING AVG(GRADE_SCORE)>=80
        ORDER BY 3 DESC;
        
--5. 수강기록 등록 시, 강의별 수강 인원 수 자동 집계 트리거
--새로운 수강기록(ENROLLMENT)이 등록될 때마다,
--해당 강의(LECTURE)의 수강인원(INDEX_COUNT) 컬럼 값을 자동으로 1 증가시키는 트리거를 작성하시오.
--또한 수강기록이 삭제될 경우, 해당 값은 1 감소해야 한다.

--트리거 생성
CREATE OR REPLACE TRIGGER TRG_ENR
AFTER INSERT ON ENROLLMENT
FOR EACH ROW
BEGIN
    IF :NEW.STATUS = 'Y' THEN
        UPDATE LECTURE
        SET INDEX_COUNT = INDEX_COUNT + 1
        WHERE LECTURE_ID = :NEW.LECTURE_ID;
    ELSIF :NEW.STATUS = 'N' THEN
        UPDATE LECTURE
        SET INDEX_COUNT = INDEX_COUNT - 1
        WHERE LECTURE_ID = :NEW.LECTURE_ID;
    END IF;
END;
/
--무결성 제약조건 회피를 위한 학생정보 추가
INSERT INTO STUDENT(
    STUDENT_ID,
    NAME,
    GRADE,
    EMAIL,
    JOIN_DATE
)VALUES(
    996,
    '이하늘',
    3,
    'LLLL@NAVER.COM',
    '19/12/05');
--새로운 학생 정보를 추가해서 INDEX 값이 늘어나는지 확인
INSERT INTO ENROLLMENT(
    ENROLL_ID,
    STUDENT_ID,
    LECTURE_ID,
    ENROLL_DATE,
    STATUS,
    GRADE_SCORE
)VALUES(
    11117,
    996,
    55,
    '20/08/01',
    'Y',
    80);
    
