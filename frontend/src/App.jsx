import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Landing from './pages/Landing';


const App = () => {
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/Login" element={<Login/>}/>
      </Routes>
      </BrowserRouter>
  )
}

export default App
