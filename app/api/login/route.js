'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        console.log('✅ Login success:', data);
        setStatus({ type: 'success', message: 'Login successful!' });

        // TODO: Navigate or store token/session
      } else {
        console.warn('⚠️ Login failed:', data);
        setStatus({ type: 'error', message: data.error || 'Login failed.' });
      }
    } catch (err) {
      console.error('🔥 Unexpected error:', err);
      setStatus({ type: 'error', message: 'Network or server error occurred.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '400px', margin: 'auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ display: 'block', width: '100%', marginBottom: '1rem' }}
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ display: 'block', width: '100%', marginBottom: '1rem' }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#333', color: '#fff' }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {status && (
        <p style={{ marginTop: '1rem', color: status.type === 'error' ? 'red' : 'green' }}>
          {status.message}
        </p>
      )}
    </main>
  );
}

