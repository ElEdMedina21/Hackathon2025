import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import Display from './components/Display'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <main className='h-screen'>
        <section className='h-[10%]'>
          <NavBar/>
        </section>
        <section className='h-[90%] flex'>
          <Display/>
        </section>
      </main>
    </>
  )
}

export default App
