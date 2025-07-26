// app/api/login/route.js

import { NextResponse } from 'next/server'

export async function POST(request) {
  const body = await request.json()
  const { email, password } = body

  // Basic validation
  if (!email || !password) {
    return NextResponse.json({ error: 'Missing credentials' }, { status: 400 })
  }

  // TODO: Replace with Airtable logic
  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
}
