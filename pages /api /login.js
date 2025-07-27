// pages/api/login.js
export default function handler(req, res) {
  if (req.method === "POST") {
    return res.status(200).json({ message: "MFA code sent (test)" });
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
