import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UseStateTest from './components/useState/UseStateTest'
import Signup from './components/useState/Signup'
import LandingPage from './components/useState/LandingPage'
import UseRefTest from './components/UseRef/UseRefTest'
import UseRefScroll from './components/UseRef/UseRefScroll'
import UseMemoTest from './components/UseMemo/UseMemoTest'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <LandingPage /> */}
      {/* <UseRefTest/> */}
      {/* <UseRefScroll/> */}
      <UseMemoTest/>
    </>
  )
}

export default App
