import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '../utils/fetcher'

export default function Login() {
  const [email, setEmail] = useState('demo@example.com')
  const [password, setPassword] = useState('password')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handle = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const data = await apiFetch('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      })

      // Save JWT token for future requests
      if (data.token) {
        localStorage.setItem('auth_token', data.token)
      }

      navigate('/dashboard')
    } catch (err: any) {
      setError(err.data?.error || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handle}>
        <label>Email
          <input value={email} onChange={e => setEmail(e.target.value)} />
        </label>

        <label>Password
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? '...' : 'Login'}
        </button>
      </form>

      {error && <div className='error'>{error}</div>}
    </div>
  )
}
