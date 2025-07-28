// ✅ File: pages/api/login.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' });
  }

  // TEMP: Hardcoded test
  if (email === "ktoppazzini@tlleanmanagement.com" && password === "123456") {
    return res.status(200).json({ message: "Login successful" });
  }

  return res.status(401).json({ error: "Invalid credentials" });
}
