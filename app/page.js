'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomeRedirect() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('Redirecting to /login...');
      router.replace('/login');
    } else {
      console.log('Window object not available');
    }
  }, [router]);

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <p>Redirecting to login...</p>
    </main>
  );
}
