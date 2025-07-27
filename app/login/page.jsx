"use client";
import { useState } from "react";
import styles from "./login.module.css";
import Image from "next/image";
import secure from "/public/images/secure.png";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      console.log("🚀 Logging in..."); // Debug line

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.error || "Login failed");
      }

      const result = await response.json();
      console.log("✅ Login response:", result); // Debug line

      if (result.mfa === "sms") {
        localStorage.setItem("mfaMethod", "sms");
        alert("Text sent.");
        router.push(`/verify-mfa?email=${encodeURIComponent(email)}`);
      } else if (result.mfa === "email") {
        localStorage.setItem("mfaMethod", "email");
        alert("Email sent.");
        router.push(`/verify-mfa?email=${encodeURIComponent(email)}`);
      } else {
        throw new Error("Unexpected MFA method.");
      }
    } catch (err) {
      console.error("❌ Login error:", err);
      setError("Unexpected error during login.");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin} className={styles.form}>
        <Image src={secure} alt="Secure" width={40} height={40} />
        <h2 className={styles.title}>🔒 Sovereign Ops Login</h2>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          Login
        </button>

        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}
