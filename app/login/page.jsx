'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('🔧 Submitting login form...');
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

      console.log('📨 Response received:', res.status);

      const data = await res.json();
      console.log('📦 Data:', data);

      if (res.ok) {
        setStatus({ type: 'success', message: 'Login successful!' });
      } else {
        setStatus({ type: 'error', message: data.error || 'Login failed.' });
      }
    } catch (err) {
      console.error('🔥 Error during fetch:', err);
      setStatus({ type: 'error', message: 'Unexpected error during login.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', paddingTop: '5rem' }}>
      <h2>🔐 Sovereign Ops Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{ backgroundColor: '#001F3F', color: '#fff', padding: '0.5rem 1rem' }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {status && (
        <p style={{ marginTop: '1rem', color: status.type === 'error' ? 'red' : 'green' }}>
          {status.message}
        </p>
      )}
    </div>
  );
}


