import React, { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const from = location.state?.from?.pathname || '/dashboard'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      setLoading(true)
      await login(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-main">
      <div className="glass-shell auth-shell">
        <h1
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#f9fafb',
            marginBottom: '0.5rem',
          }}
        >
          Welcome back
        </h1>
        <p style={{ fontSize: '0.9rem', color: '#9ca3af', marginBottom: '1rem' }}>
          Login to continue to TaskFlow.
        </p>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '0.7rem' }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.85rem',
                color: '#9ca3af',
                marginBottom: '0.2rem',
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '0.45rem 0.75rem',
                borderRadius: 10,
                border: '1px solid rgba(148,163,184,0.7)',
                backgroundColor: '#020617',
                color: '#e5e7eb',
                fontSize: '0.9rem',
              }}
            />
          </div>
          <div style={{ marginBottom: '0.8rem' }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.85rem',
                color: '#9ca3af',
                marginBottom: '0.2rem',
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '0.45rem 0.75rem',
                borderRadius: 10,
                border: '1px solid rgba(148,163,184,0.7)',
                backgroundColor: '#020617',
                color: '#e5e7eb',
                fontSize: '0.9rem',
              }}
            />
          </div>
          {error && (
            <div
              style={{
                fontSize: '0.8rem',
                color: '#fecaca',
                marginBottom: '0.6rem',
              }}
            >
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginBottom: '0.6rem' }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
          No account?{' '}
          <Link to="/register" style={{ color: '#a5b4fc' }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login