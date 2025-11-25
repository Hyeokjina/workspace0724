import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProfileCard from './components/ProfileCard'

const profile = [{
  name: "홍길동",
  age: 23,
  isOnline: true,
},{
  name: "홍길이",
  age: 22,
  isOnline: true,
},{
  name: "홍길삼",
  age: 25,
  isOnline: false,
},{
  name: "김철수",
  age: 28,
  isOnline: true
},{
  name: "이영희",
  age: 24,
  isOnline: false
},{
  name: "박민수",
  age: 26,
  isOnline: true
}]

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {profile.map((p, index) => <ProfileCard key={index} profile={p} />)}
    </>
  )
}

export default App
