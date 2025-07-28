// app/api/login/route.js
export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (email === "ktoppazzini@tlleanmanagement.com" && password === "123456") {
      return new Response(JSON.stringify({ message: "Login successful" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Invalid credentials" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
