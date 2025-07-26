import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    console.log('🔐 API Login Request Received:', email);

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
    }

    const validEmail = process.env.ADMIN_EMAIL || 'ktoppazzini@tlleanmanagement.com';
    const validPassword = process.env.ADMIN_PASSWORD || 'yourStrongPasswordHere';

    if (email === validEmail && password === validPassword) {
      console.log('✅ Login successful');
      return NextResponse.json({ success: true });
    } else {
      console.warn('❌ Invalid credentials');
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
  } catch (err) {
    console.error('🔥 Error in API login route:', err);
    return NextResponse.json({ error: 'Server error during login' }, { status: 500 });
  }
}
