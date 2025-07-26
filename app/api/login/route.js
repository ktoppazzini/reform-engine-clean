// /app/api/login/route.js

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
      console.debug('[API] Login successful')
      return NextResponse.json({ success: true })
    }

    console.debug('[API] Invalid credentials')
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  } catch (err) {
    console.error('[API] Error in login POST handler:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

