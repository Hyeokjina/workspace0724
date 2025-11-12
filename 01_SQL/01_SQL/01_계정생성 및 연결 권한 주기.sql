-- 사용자 계정 생성
CREATE USER c##gymhub IDENTIFIED BY gymhub;


-- 접속 권한 및 테이블 생성 권한 부여
GRANT CONNECT, RESOURCE TO c##gymhub;


-- 테이블스페이스 설정
ALTER USER C##gymhub DEFAULT TABLESPACE USERS QUOTA UNLIMITED ON USERS;
