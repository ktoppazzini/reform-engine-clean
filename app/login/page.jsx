"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./login.module.css"; // Make sure this file exists
import secureImage from "@/public/images/secure.png"; // Ensure this path and file are correct

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [method, setMethod] = useState("email"); // or "sms"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Login failed");
        return;
      }

      // Dummy logic: navigate to dashboard or next step
      router.push("/dashboard");
    } catch (err) {
      console.error("❌ Login fetch error:", err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <Image
          src={secureImage}
          alt="Secure"
          width={80}
          height={80}
          className={styles.logo}
        />
        <h2 className={styles.title}>Login</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Preferred Method:</label>
          <select value={method} onChange={(e) => setMethod(e.target.value)}>
            <option value="email">Email</option>
            <option value="sms">SMS</option>
          </select>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && <p className={styles.error}>{error}</p>}
        </form>
      </div>
    </div>
  );
}
