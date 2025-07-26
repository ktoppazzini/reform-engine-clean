'use client';

import { useEffect } from 'react';

export default function LoginPage() {
  useEffect(() => {
    console.log('LoginPage component mounted');
  }, []);

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Login Page</h1>
      <p>This is a placeholder login page. If you're seeing this, routing is working.</p>
    </main>
  );
}
