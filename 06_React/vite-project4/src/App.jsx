import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LifecycleTest from './componoents/LifecycleTest'

function App() {
  const [isView, setIsVeiw] = useState(false);
  const toggleButton = () => {
    setIsVeiw(!isView)
  }

  return (
    <>
      {isView && <LifecycleTest />}
      <button onClick={toggleButton}>
        {isView ? "숨기기" : "보이기"}</button>
    </>
  )
}

export default App
