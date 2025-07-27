import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body || {};

    console.log("✅ Login POST received:", { email, hasPassword: !!password });

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing email or password" },
        { status: 400 }
      );
    }

    // ✅ Dummy success response (replace with real logic later)
    return NextResponse.json(
      { message: "Login success (test)" },
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ API Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

