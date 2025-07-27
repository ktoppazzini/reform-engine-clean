// pages/login.jsx

import React, { useState } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const loginUser = async (email, password) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const text = await res.text(); // Handle invalid JSON
      let data;

      try {
        data = JSON.parse(text);
      } catch (parseErr) {
        console.error("❌ Failed to parse response:", text);
        throw new Error("Invalid response from server");
      }

      console.log("✅ Server Response:", data);

      if (!res.ok) {
        setError(data.error || "Login failed");
        setMessage("");
      } else {
        setError("");
        setMessage("MFA code sent. Please check your phone.");
        // Optionally redirect to MFA page
        // router.push("/verify");
      }
    } catch (err) {
      console.error("❌ Login fetch error:", err);
      setError("Something went wrong. Try again.");
      setMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log("📨 Attempting login with", email);
    setError("");
    setMessage("");

    await loginUser(email, password);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
      <h2>🔐 Login to Sovereign Intelligence</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Log In
        </button>
      </form>
      {error && <p style={{ color: "red", marginTop: "1rem" }}>❌ {error}</p>}
      {message && <p style={{ color: "green", marginTop: "1rem" }}>✅ {message}</p>}
    </div>
  );
}
