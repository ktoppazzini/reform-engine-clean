// File: pages/login.jsx

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const loginUser = async (email, password) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const rawText = await res.text();
      console.log("🧾 Raw response:", rawText);

      try {
        const data = JSON.parse(rawText);
        console.log("✅ Parsed data:", data);

        if (res.ok && data.success) {
          setStatus("✅ Login successful");
          // Add redirect or token storage here
        } else {
          setStatus(`❌ ${data.error || "Login failed"}`);
        }
      } catch (parseErr) {
        console.error("❌ JSON parse error:", parseErr);
        setStatus("❌ Invalid response from server.");
      }
    } catch (err) {
      console.error("❌ Login fetch error:", err);
      setStatus("❌ Failed to reach server.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("⏳ Logging in...");
    loginUser(email, password);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ marginLeft: "1rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ marginLeft: "1rem" }}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p style={{ marginTop: "1rem" }}>{status}</p>
    </div>
  );
}

