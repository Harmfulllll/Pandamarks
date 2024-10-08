import './App.css'
import { Signup } from './pages/Signup/Signup'
import {Login } from './pages/Login/Login'
import  Dashboard  from './pages/Dashboard/Dashboard'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import ResetPassword from './pages/ResetPassword/ResetPassword'
import Home from './pages/Home/Home'
import { Route, Routes, Navigate } from 'react-router-dom'
import {useSelector} from 'react-redux'

function App() {
  
  const user= useSelector(state=>state.auth.user)

  return (
    <> 
     <Routes>
        <Route path="/resetpassword/:resetToken" element={<ResetPassword/>} />
        <Route path="/forgotpassword" element={<ForgotPassword/>} />
        <Route path="/"  element={user ? <Dashboard/> : <Home/>} />
        <Route path="/register"  element={user ? <Dashboard/> : <Signup/>} />
        <Route path="/login" element={user ? <Dashboard/> : <Login/>} />
        <Route path="*" element={<Navigate to="/"/>} />
     </Routes>
        
    </>
  )
}

export default App
