// pages/api/login.js

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { email, password } = req.body;

      // ✅ Basic validation (you can expand this)
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
      }

      // 🔐 Simulated login logic (replace with real auth)
      if (email === "ktoppazzini@tlleanmanagement.com" && password === "123456") {
        return res.status(200).json({ message: "MFA code sent (test)" });
      } else {
        return res.status(401).json({ error: "Invalid credentials." });
      }
    }

    // ❌ Method not allowed
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

