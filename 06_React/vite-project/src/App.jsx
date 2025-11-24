import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import JavaScript from './components/javaScript'
import './App.css'
import Style from './components/Style'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <JavaScript /> */}
      <Style/>
    </>
  )
}

export default App
