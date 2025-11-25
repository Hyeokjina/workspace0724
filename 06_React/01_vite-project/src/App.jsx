import { useState } from 'react'
import JavaScript from './components/JavaScript'
import './App.css'
import Product from './components/Product'
import styled from 'styled-components'

const products = [
    {
        product_id: 1,
        product_name: "삼성 갤럭시S25",
        price: 1000000,
        color: "블랙",
    },
    {
        product_id: 2,
        product_name: "삼성 갤럭시S25 울트라",
        price: 1100000,
        color: "화이트",
    },
    {
        product_id: 3,
        product_name: "아이폰 17",
        price: 1050000,
        color: "민트",
    },
    {
        product_id: 4,  // 3에서 4로 수정
        product_name: "아이폰 15",
        price: 700000,
        color: "오렌지",
    },
    {
        product_id: 5,
        product_name: "갤럭시Z플립6",
        price: 1200000,
        color: "라벤더",
    },
    {
        product_id: 6,
        product_name: "갤럭시Z폴드6",
        price: 1900000,
        color: "실버",
    },
    {
        product_id: 7,
        product_name: "아이폰 16 프로",
        price: 1300000,
        color: "티타늄 블루",
    },
    {
        product_id: 8,
        product_name: "아이폰 16 프로 맥스",
        price: 1500000,
        color: "골드",
    },
    {
        product_id: 9,
        product_name: "구글 픽셀9",
        price: 900000,
        color: "민트",
    },
    {
        product_id: 10,
        product_name: "구글 픽셀9 프로",
        price: 1100000,
        color: "블랙",
    },
    {
        product_id: 11,
        product_name: "샤오미14 울트라",
        price: 800000,
        color: "화이트",
    },
    {
        product_id: 12,
        product_name: "갤럭시A55",
        price: 500000,
        color: "블루",
    },
    {
        product_id: 13,
        product_name: "아이폰SE 3세대",
        price: 600000,
        color: "레드",
    },
    {
        product_id: 14,
        product_name: "갤럭시S24",
        price: 850000,
        color: "그린",
    },
    {
        product_id: 15,
        product_name: "원플러스12",
        price: 750000,
        color: "블랙",
    }
];

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const Th = styled.th`
  background: #8a8a8a;
  color: white;
  padding: 12px;
  border: 1px solid #afafaf;
`

const Tr = styled.tr`
  
`

function App() {

  return (
    <>
      {/* <JavaScript /> */}
      {/* <Style /> */}
      <Table>
        <thead>
          <tr>
            <Th>제품명</Th>
            <Th>가격</Th>
            <Th>색상</Th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => <Product key={p.product_id} product={p}/>)}
        </tbody>
      </Table>
    </>
  )
}

export default App