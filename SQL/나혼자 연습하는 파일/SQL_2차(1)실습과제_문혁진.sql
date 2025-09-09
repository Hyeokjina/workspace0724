--문제는 아래 풀었습니다.
DROP TABLE Book;

CREATE TABLE Book (
bookid  NUMBER(2) PRIMARY KEY,
bookname VARCHAR2(40),
publisher VARCHAR2(40),
price NUMBER(8)
);

INSERT INTO Book VALUES(1, '축구의 역사','굿스포츠', 7000);
INSERT INTO Book VALUES(2, '축구아는 여자','나무수', 13000);
INSERT INTO Book VALUES(3, '축구의 이해','대한미디어', 22000);
INSERT INTO Book VALUES(4, '골프 바이블','대한미디어', 35000);
INSERT INTO Book VALUES(5, '피겨 교본','굿스포츠', 8000);
INSERT INTO Book VALUES(6, '역도 단계별기술','굿스포츠', 6000);
INSERT INTO Book VALUES(7, '야구의 추억','이상미디어', 20000);
INSERT INTO Book VALUES(8, '야구를 부탁해','이상미디어', 13000);
INSERT INTO Book VALUES(9, '올림픽 이야기','삼성당', 7500);
INSERT INTO Book VALUES(10, 'Olympic Champions','Pearson', 13000);

select * from Book;



DROP TABLE Customer;

CREATE TABLE Customer (
custid  NUMBER(2) PRIMARY KEY,
name  VARCHAR2(40),
address VARCHAR2(50),
phone VARCHAR2(20)
);

INSERT INTO Customer VALUES(1, '박지성','영국 맨체스터', '000-5000-0001');
INSERT INTO Customer VALUES(2, '김연아','대한민국 서울', '000-6000-0001');
INSERT INTO Customer VALUES(3, '장미란','대한민국 강원도', '000-7000-0001');
INSERT INTO Customer VALUES(4, '추신수','미국 클리브랜드', '000-8000-0001');
INSERT INTO Customer VALUES(5, '박세리','대한민국 대전', NULL);

select * from Customer;



DROP TABLE Orders;

CREATE TABLE Orders (
orderid NUMBER(2) PRIMARY KEY,
custid  NUMBER(2) REFERENCES Customer(custid),
bookid  NUMBER(2) REFERENCES Book(bookid),
salesprice  NUMBER(8),
orderdate DATE
);

INSERT INTO Orders VALUES(1, 1, 1, 6000, TO_DATE('2014-07-01', 'yyyy-mm-dd'));
INSERT INTO Orders VALUES(2, 1, 3, 21000, TO_DATE('2014-07-03', 'yyyy-mm-dd'));
INSERT INTO Orders VALUES(3, 2, 5, 8000, TO_DATE('2014-07-03', 'yyyy-mm-dd'));
INSERT INTO Orders VALUES(4, 3, 6, 6000, TO_DATE('2014-07-04', 'yyyy-mm-dd'));
INSERT INTO Orders VALUES(5, 4, 7, 20000, TO_DATE('2014-07-05', 'yyyy-mm-dd'));
INSERT INTO Orders VALUES(6, 1, 2, 12000, TO_DATE('2014-07-07', 'yyyy-mm-dd'));
INSERT INTO Orders VALUES(7, 4, 8, 13000, TO_DATE('2014-07-07', 'yyyy-mm-dd'));
INSERT INTO Orders VALUES(8, 3, 10, 12000, TO_DATE('2014-07-08', 'yyyy-mm-dd'));
INSERT INTO Orders VALUES(9, 2, 10, 7000, TO_DATE('2014-07-09', 'yyyy-mm-dd'));
INSERT INTO Orders VALUES(10, 3, 8, 13000, TO_DATE('2014-07-10', 'yyyy-mm-dd'));

select * from Orders;


COMMIT;


--1. Orders 테이블에서 고객이 주문한 도서의 총 판매액을 구하시오
SELECT SUM(salesprice) AS total_sales
FROM Orders;

 

--2. Orders 테이블에서 고객별로 주문한 도서의 총 판매 수량과 판매액을 검색하시오
--(단, 출력 결과는 custid, 고객별 총 판매 수량, 고객별 총 판매액을 보여주어야 함)
SELECT custid,
       COUNT(*)         AS total_quantity,
       SUM(salesprice)  AS total_sales
FROM Orders
GROUP BY custid;

 

--3. Customer 테이블과 Orders 테이블을 조인(JOIN)하여 고객id(custid), 고객 이름, 주소, 전화번호, 판매가격, 판매 일자 정보를 검색하시오.
SELECT C.custid,
       C.name,
       C.address,
       C.phone,
       O.salesprice,
       O.orderdate
FROM Customer C
JOIN Orders O
  ON C.custid = O.custid;

 

--4. Customer 테이블과 Orders 테이블, Book 테이블을 조인(JOIN)하여 고객의 이름(name)과 주문한 도서의 이름(bookname)을 검색하시오.
SELECT C.name      AS customer_name,
       B.bookname  AS book_name
FROM Orders O
JOIN Customer C ON O.custid = C.custid
JOIN Book B     ON O.bookid = B.bookid;

 

--5. Subquery(부속질의)를 사용하여 가장 비싼 도서의 이름을 검색하시오.
SELECT bookname
FROM Book
WHERE price = (SELECT MAX(price) FROM Book);

 

--6. Subquery(부속질의)를 사용하여 도서를 구매한 적이 있는 고객의 이름을 검색하시오.
SELECT name
FROM Customer
WHERE custid IN (SELECT DISTINCT custid FROM Orders);

 

--7. Dual 테이블에서 4.875를 소수 첫째 자리까지 반올림한 값을 구하시오.
SELECT ROUND(4.875, 1) AS rounded_value
FROM DUAL;

 

--8. Orders 테이블에서 고객별 평균 주문 금액을 백 원 단위로 반올림한 값을 구하시오.
--단, 출력 결과물에 custid도 같이 포함하여 검색하시오. (GROUP BY 키워드와 SUM, ROUND 함수 사용)
SELECT custid,
       ROUND(AVG(salesprice), -2) AS avg_order_rounded_100won
FROM Orders
GROUP BY custid;

 

--9. Orders 테이블에서 orderid, orderdate, custid, bookid 속성을 보여주시오. 
--단, orderdate는 ‘yyyy-mm-dd 요일’ 형태로 표시한다.
SELECT orderid,
       -- 날짜 형식 부분: YYYY-MM-DD + 공백 + (한글 요일)
       TO_CHAR(orderdate, 'YYYY-MM-DD') 
         || ' ' 
         || TO_CHAR(orderdate, 'DAY', 'NLS_DATE_LANGUAGE=KOREAN') AS orderdate_with_day,
       custid,
       bookid
FROM Orders;

 

--10. Customer 테이블에서 phone속성이 NULL이 아닌 고객의 모든 속성 정보를 보여주시오.
SELECT *
FROM Customer
WHERE phone IS NOT NULL;

 
