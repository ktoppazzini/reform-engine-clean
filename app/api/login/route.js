// File: /app/api/login/route.js
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    console.log("✅ Login attempt:", { email });

    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Missing credentials" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // TEMP: Simulate login success
    return new Response(JSON.stringify({ message: "Login success" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

