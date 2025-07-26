'use client'

import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    console.debug('[Login Submit] Initiating POST with:', { email, password })

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()
      console.debug('[Login Submit] Response:', res.status, data)

      if (res.ok) {
        setSuccess(true)
      } else {
        setError(data.error || 'Login failed')
      }
    } catch (err) {
      console.error('[Login Submit] Unexpected Error:', err)
      setError('Unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '400px', margin: 'auto' }}>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Password:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ padding: '0.5rem 1rem' }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
      {success && <p style={{ color: 'green', marginTop: '1rem' }}>Login successful!</p>}
    </main>
  )
}

