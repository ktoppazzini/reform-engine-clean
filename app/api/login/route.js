// app/api/login/route.js

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body || {};

    console.log("📨 Login POST received:", { email, hasPassword: !!password });

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Missing email or password" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // TEMP: Just log and return dummy success for now
    return new Response(
      JSON.stringify({ message: "Login success (test)" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.error("🔥 Login route crashed:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}


