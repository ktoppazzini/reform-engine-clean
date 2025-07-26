import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, password } = body

    console.debug('[API] Received login POST:', { email, password })

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 })
    }

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      return NextResponse.json({ success: true }, { status: 200 })
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  } catch (err) {
    console.error('[API] Login failed:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// ✅ Add this below POST to handle accidental GETs
export async function GET() {
  return NextResponse.json({ message: 'Login API is live' }, { status: 200 })
}


