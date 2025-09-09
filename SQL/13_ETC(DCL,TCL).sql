/*
    <DCL : 데이터 제어문>
    계정에 시스템권한 또는 객체접근 권한을 부여하거나 회수하는 구문
    즉, 누가 어떤 객체에 무엇을 할 수있는지를 통제한다.
    
    >시스템권     : DB객체생성,사용자생성권한 등 관리자권한
    >객체접근권한  : 테이블, 뷰, 시퀀스 등 특정 객체에 접근 권한
    
    1) 사용자생성
    CREATE USER 사용자명 IDENTIFIED BY 비밀번호;;
    
    2)권한부여
    GRANT 권한(RESOURCE, CONNECT) TO 계정;
    
    3)권한회수
    REVOKE 권한 TO 계정;
    
    ORACLE은 기본적으로 사용자 생성 후 권한을 부여해야 로그인 및 객체사용 가능
*/

SELECT * FROM ROLE_SYS_PRIVS;

/*
    <TCL : 트랜잭션 제어문>
    트랜잭션은 하나이상의 DML(INSERT,UPDATE,DELETE)문을 묶어서 하나의 논리적 작업 단위로 처리하는 개념.
    
    DML문 한개를 수행할 떄 트렌잭션이 존재하지않으면 트래잭션을 만들어서 묶음.
                        트랜잭션이 존재하면 해당 트랜잭션에 작업을 묶어서 처리.
    
    COMMIT   : 트랜잭션 확정 및 저장
    ROLLBACK : 트랜잭션 취소 및 이전 상태로 복원
    
    SAVEPOINT   : 롤백용으로 중간지점을 지정
    ROLLBACK TO : 특정 지점까지 복원
    
    대부분 요즘은 AUTOCOMMIT 설치되어 있어서 DML을 전달할 때마다 자동으로 커밋이 됨.   
*/

--AUTOCOMMIT 여부를 확인
SHOW AUTOCOMMIT;

--AUTOCOMMIT  수동설정 / ON ->자동으로 DML실행시마다 COMMIT이 진행됨.
SET AUTOCOMMIT OFF;

CREATE TABLE EMP_01
AS (SELECT EMP_ID,EMP_NAME,DEPT_TITLE
    FROM EMPLOYEE
    JOIN DEPARTMENT ON (DEPT_CODE = DEPT_ID));

SELECT * FROM EMP_01;

--사번이 200,201인 사람 제거
DELETE FROM EMP_01
WHERE EMP_ID IN (200,201);

ROLLBACK;
--200,201이 다시 돌아옴
SELECT *FROM EMP_01;

--사번이 200,201인 사람 다시제거
DELETE FROM EMP_01
WHERE EMP_ID IN (200,201);

COMMIT;
ROLLBACK;
--200,201이 돌아오지 못함
SELECT * FROM EMP_01;


--사번이 217,216,214인 사람 제거
DELETE FROM EMP_01
WHERE EMP_ID IN (217,216,214);

SELECT * FROM EMP_01;

SAVEPOINT SP;

INSERT INTO EMP_01
VALUES(801,'김민규','기술지원부');

INSERT INTO EMP_01
VALUES(802,'정수빈','창업지원부');

ROLLBACK TO SP;
COMMIT;
--801,802는 사라지고 217,216,214는 사라진다.
SELECT * FROM EMP_01;

INSERT INTO EMP_01
VALUES(801,'김민규','기술지원부');

INSERT INTO EMP_01
VALUES(802,'정수빈','창업지원부');

CREATE TABLE TEST(
    TID NUMBER);

ROLLBACK;
SELECT *FROM EMP_01;

/*
    DDL문(CREATE, ALTER, DROP)을 수행하는 순간 기존 트랜잭션은 무조건 COMMI됨(실제DB반영)
    즉, DDL문 수행 전 변경사항들이 있다면 정확하게 픽스하고 해라.
    
    ACID속성
    트랜직션의 일관성과 신뢰성을 보장하기위해 지켜야하는 4가지 핵심 속성
    
    A(Automicity)원자성  : 트랜잭션 내 작업은 모두 완료되거나, 모두 취소되어야 한다.
    C(Consistency)일관성 : 트랜잭션 수행 전후에 DB상태가 항사 유효한 상태(제약조건 충족)여야한다.
    I(Isolation)독립성   : 여러 트랜잭션이 동시에 실행되도 서로 간섭없이 독립적으로 실행되야한다.
    D(DurabilIty) 지속성 : 트랜잭션이 COMMIT되면, 그 결과는 시스템이 종료되고 영구정으로 보존된다.
*/


































