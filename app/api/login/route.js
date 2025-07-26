'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    console.log("Sending login to /api/login", { email, password });

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      console.log("Login response status:", response.status);

      const data = await response.json();
      console.log("Login response body:", data);

      if (response.ok) {
        alert('Login successful!');
        // Redirect or trigger success logic here
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      console.error("Login error:", err);
      setError('Unexpected error during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '3rem' }}>
      <form onSubmit={handleSubmit} style={{ width: '300px', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>🔒 Sovereign Ops Login</h2>

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.6rem',
            backgroundColor: '#001f3f',
            color: '#fff',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
      </form>
    </div>
  );
}
