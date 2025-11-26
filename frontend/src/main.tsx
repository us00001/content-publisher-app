import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import PublicView from './pages/PublicView'
import { apiFetch } from './utils/fetcher'
import './styles.css'

function NavBar() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await apiFetch('/logout', { method: 'DELETE' })

      // Clear frontend stored auth
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      sessionStorage.clear()

      navigate('/login')
    } catch (err) {
      console.error('Logout failed:', err)
    }
  }

  return (
    <nav className="nav">
      <Link to="/">Public</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>

      <button onClick={handleLogout} style={{ marginLeft: '20px' }}>
        Logout
      </button>
    </nav>
  )
}
function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className='container'>
        <Routes>
          <Route path='/' element={<PublicView />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
