import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Register = () => {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      setLoading(true)
      await register(name, email, password)
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setError(err.message || 'Registration failed')
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
          Create account
        </h1>
        <p style={{ fontSize: '0.9rem', color: '#9ca3af', marginBottom: '1rem' }}>
          Register to start using TaskFlow.
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
              Name
            </label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
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
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#a5b4fc' }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register