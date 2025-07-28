// File: /app/api/login/route.js

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    console.log("✅ Login attempt:", { email });

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Missing credentials" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // TODO: Replace with real authentication logic
    
If (email === "ktoppazzini@tlleanmanagement.com" && password === "123456")
 {
      return new Response(
        JSON.stringify({ message: "Login success" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      return new Response(
        JSON.stringify({ error: "Invalid credentials" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (err) {
    console.error("❌ Login error:", err);
    return new Response(
      JSON.stringify({ error: "Server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
