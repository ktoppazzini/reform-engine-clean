import React, { useState } from 'react';

export default function LoginPage() {
  const [emailValue, setEmail] = useState('');
  const [passwordValue, setPassword] = useState('');
  const [status, setStatus] = useState('');

  // 🔐 This is loginUser() — runs when you submit the form
  const loginUser = async (email, password) => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const contentType = res.headers.get('Content-Type') || '';
      const raw = await res.text();

      console.log('📦 Raw response text:', raw);

      if (!raw || !contentType.includes('application/json')) {
        throw new Error('❌ No JSON response from server.');
      }

      let data;
      try {
        data = JSON.parse(raw);
      } catch (err) {
        console.error('❌ JSON parse error:', err.message);
        throw new Error('Server response was invalid JSON.');
      }

      if (res.ok) {
        setStatus(`✅ ${data.message || 'Login successful'}`);
        // Optional: redirect or move to next screen here
      } else {
        setStatus(`❌ ${data.error || 'Login failed'}`);
      }
    } catch (err) {
      console.error('❌ Login error:', err);
      setStatus(`❌ ${err.message}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('⏳ Processing...');
    loginUser(emailValue, passwordValue);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={emailValue}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ marginLeft: '0.5rem' }}
          />
        </div>
        <div style={{ marginTop: '1rem' }}>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={passwordValue}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ marginLeft: '0.5rem' }}
          />
        </div>
        <button style={{ marginTop: '1rem' }} type="submit">
          Login
        </button>
      </form>
      <p style={{ marginTop: '1rem', color: 'darkred' }}>{status}</p>
    </div>
  );
}

