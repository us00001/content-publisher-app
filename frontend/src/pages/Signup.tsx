import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '../utils/fetcher'

export default function Signup(){
  const [name,setName]=useState('Demo User')
  const [email,setEmail]=useState('demo@example.com')
  const [password,setPassword]=useState('password')
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState<string|null>(null)
  const navigate = useNavigate()

  const handle = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try{
      await apiFetch('/signup', { method: 'POST', body: JSON.stringify({ user: { name, email, password, password_confirmation: password } }) })
      navigate('/dashboard')
    }catch(err:any){
      setError(err.data?.errors?.join(', ') || 'Signup failed')
    }finally{ setLoading(false) }
  }

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handle}>
        <label>Name<input value={name} onChange={e=>setName(e.target.value)} /></label>
        <label>Email<input value={email} onChange={e=>setEmail(e.target.value)} /></label>
        <label>Password<input value={password} onChange={e=>setPassword(e.target.value)} /></label>
        <button type="submit" disabled={loading}>{loading? '...' : 'Signup'}</button>
      </form>
      {error && <div className='error'>{error}</div>}
    </div>
  )
}
