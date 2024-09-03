import './App.css'
import { Signup } from './pages/Signup/Signup'
import {Login } from './pages/Login/Login'
import  Dashboard  from './pages/Dashboard/Dashboard'
import Home from './pages/Home/Home'
import { Route, Routes, Navigate } from 'react-router-dom'

function App() {
 

  return (
    <> 
     <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" />} />
     </Routes>
        
    </>
  )
}

export default App
