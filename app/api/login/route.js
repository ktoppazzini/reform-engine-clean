import { NextResponse } from 'next/server'

/**
 * GET request — used for health checks or to verify route availability
 */
export async function GET() {
  console.log("🟢 GET /api/login — route is active.")
  
  return NextResponse.json({
    message: 'Login endpoint is active.',
    timestamp: new Date().toISOString()
  })
}


/**
 * POST request — handles login form submission and validates credentials
 */
export async function POST(request) {
  console.log("📨 POST /api/login triggered")

  try {
    const body = await request.json()

    // Debug: Show raw body content
    console.log("📦 Incoming request body:", body)

    const { email, password } = body || {}

    // Step 1: Validate email and password presence
    if (!email || !password) {
      console.warn("⚠️ Missing credentials — Email or password not provided.")
      
      return NextResponse.json(
        { error: 'Missing credentials. Please enter both email and password.' },
        { status: 400 }
      )
    }

    // Step 2: Load admin credentials from environment
    const validEmail = process.env.ADMIN_EMAIL || 'ktoppazzini@tlleanmanagement.com'
    const validPassword = process.env.ADMIN_PASSWORD || 'test123'

    console.log("🔐 Checking credentials against environment values...")
    console.log(`📧 Submitted Email: ${email}`)
    console.log(`📧 Expected Email: ${validEmail}`)

    const emailMatch = email === validEmail
    const passwordMatch = password === validPassword

    if (emailMatch && passwordMatch) {
      console.log("✅ Successful login")

      // Optional: Set session token / auth cookie logic here

      return NextResponse.json({
        success: true,
        user: {
          email,
          loginTime: new Date().toISOString()
        }
      })
    }

    // Step 3: Invalid credentials
    console.warn("❌ Invalid credentials provided")

    return NextResponse.json(
      { error: 'Invalid credentials. Please try again.' },
      { status: 401 }
    )

  } catch (err) {
    // Step 4: Handle unexpected errors
    console.error("🔥 Error handling login request:", err)

    return NextResponse.json(
      {
        error: 'Unexpected error occurred while processing login.',
        details: err.message || 'No error message available',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

