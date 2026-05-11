import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  function handleLogout() {
    logout()
    navigate('/')
    setMenuOpen(false)
  }

  return (
    <nav className="bg-blue-700 text-white px-6 py-4">

      {/* Top row — always visible */}
      <div className="flex justify-between items-center">

        <Link to="/" className="text-xl font-bold hover:text-blue-200">
          JobPortal
        </Link>

        {/* Desktop links — hidden on mobile */}
        <div className="hidden md:flex gap-6 text-sm">
          <Link to="/" className="hover:text-blue-200">Home</Link>
          <Link to="/jobs" className="hover:text-blue-200">Jobs</Link>
          <Link to="/post-job" className="hover:text-blue-200">Post a Job</Link>
          {user && user.role === 'company' && (
    <Link to="/hr-dashboard" className="hover:text-blue-200">HR Dashboard</Link> 
  )} 
  {user && user.role === 'candidate' && (
    <Link to="/my-applications" className="hover:text-blue-200">My Applications</Link>
  )}

        </div>



        {/* Desktop auth — hidden on mobile */}
        <div className="hidden md:flex gap-3 items-center">
          {user ? (
            <>
              <span className="text-sm text-blue-200">
                👋 Hi, <strong className="text-white">{user.name}</strong>
              </span>
              <button onClick={handleLogout}
                className="border border-white px-4 py-1 rounded text-sm hover:bg-blue-600">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login"
                className="border border-white px-4 py-1 rounded text-sm hover:bg-blue-600">
                Login
              </Link>
              <Link to="/register"
                className="bg-white text-blue-700 px-4 py-1 rounded text-sm font-medium hover:bg-blue-100">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Hamburger button — mobile only */}
        <button
          className="md:hidden text-2xl leading-none"
          onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>

      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-3 text-sm border-t border-blue-600 pt-4">
          <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-blue-200">Home</Link>
          <Link to="/jobs" onClick={() => setMenuOpen(false)} className="hover:text-blue-200">Jobs</Link>
          <Link to="/post-job" onClick={() => setMenuOpen(false)} className="hover:text-blue-200">Post a Job</Link>
          {user && user.role === 'company' && (
    <Link to="/hr-dashboard" className="hover:text-blue-200">HR Dashboard</Link>
  )}
  {user && user.role === 'candidate' && (
  <Link to="/my-applications"
    onClick={() => setMenuOpen(false)}
    className="hover:text-blue-200">
    My Applications
  </Link>
)}


          <div className="flex flex-col gap-2 mt-2">
            {user ? (
              <>
                <span className="text-blue-200">👋 Hi, {user.name}</span>
                <button onClick={handleLogout}
                  className="border border-white px-4 py-2 rounded text-sm hover:bg-blue-600 text-left">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)}
                  className="border border-white px-4 py-2 rounded text-sm hover:bg-blue-600 text-center">
                  Login
                </Link>
                <Link to="/register" onClick={() => setMenuOpen(false)}
                  className="bg-white text-blue-700 px-4 py-2 rounded text-sm font-medium hover:bg-blue-100 text-center">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}

    </nav>
  )
}

export default Navbar