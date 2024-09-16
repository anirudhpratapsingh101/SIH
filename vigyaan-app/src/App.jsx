import { useState } from 'react'
import Login from './Login/Login.jsx'
import './App.css'
import { AnimatedBackground } from 'animated-backgrounds';
function App() {
  return (
    <>
      <AnimatedBackground animationName="gradientWave"/>
      <Login></Login>
    </>
  )
}

export default App
