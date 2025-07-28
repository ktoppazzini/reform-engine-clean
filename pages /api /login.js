// File: pages/api/login.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { email, password } = req.body;

    if (email === "ktoppazzini@tlleanmanagement.com" && password === "123456") {
      return res.status(200).json({ message: "Login successful" });
    }

    return res.status(401).json({ error: "Invalid credentials" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
