import react from 'react'
import {BrowserRouter, Router, Route, Navigate, Routes} from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import NotFound from './pages/notfound'
import Register from './pages/register'
import ProtectedRoute from './components/ProtectedRoute'

function Logout(){
  localStorage.clear()
  return <Navigate to="/login" replace />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register/>
}

function App() {
return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='*' element={<NotFound/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
