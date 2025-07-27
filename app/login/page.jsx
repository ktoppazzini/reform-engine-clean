// /app/login/page.jsx
"use client";

import { useState } from "react";
import styles from "./login.module.css";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("🔁 Sent POST to /api/login");

      const text = await res.text();
      console.log("📥 Raw response text:", text);

      const data = JSON.parse(text); // robust parsing even if not JSON

      if (!res.ok) {
        setError(data?.error || "Something went wrong.");
      } else {
        alert(data.message || "Login successful");
      }
    } catch (err) {
      console.error("❌ Login error:", err);
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Image src="/images/secure.png" alt="Secure Icon" width={120} height={120} />
      <h2>Sign in to your account</h2>

      <form onSubmit={handleLogin}>
        <input
          className={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className={styles.button} type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.notice}>
        Secure access powered by <strong>Sovereign Intelligence</strong>.
      </div>
    </div>
  );
}

