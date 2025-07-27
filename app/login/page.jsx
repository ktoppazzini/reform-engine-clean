"use client";

import { useState } from "react";
import styles from "./login.module.css"; // Make sure this CSS file exists
import Image from "next/image";
import secureImage from "@/public/images/secure.png"; // Make sure image is here

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState("login");
  const [mfaCode, setMfaCode] = useState("");
  const [error, setError] = useState("");
  const [method, setMethod] = useState("email"); // can be "email" or "sms"

  const handleLogin = async () => {
    setError("");
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();
      console.log("🔐 Login response:", result);

      if (result.status === "mfa") {
        setMethod(result.method || "email");
        setStep("mfa");
      } else if (result.status === "ok") {
        window.location.href = "/dashboard"; // adjust as needed
      } else {
        setError(result.error || "Login failed.");
      }
    } catch (e) {
      console.error("❌ Login error:", e);
      setError("Unexpected error during login.");
    }
  };

  const handleVerifyMfa = async () => {
    setError("");
    try {
      const res = await fetch("/api/verify-mfa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: mfaCode }),
      });

      const result = await res.json();
      console.log("🔐 MFA verification result:", result);

      if (result.status === "ok") {
        window.location.href = "/dashboard";
      } else {
        setError(result.error || "Invalid code.");
      }
    } catch (e) {
      console.error("❌ MFA verification error:", e);
      setError("Error verifying code.");
    }
  };

  return (
    <div className={styles.container}>
      <Image src={secureImage} alt="Secure Login" width={120} />
      <h2>Secure Login</h2>

      {step === "login" ? (
        <>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <button onClick={handleLogin} className={styles.button}>
            Login
          </button>
        </>
      ) : (
        <>
          <p className={styles.notice}>
            {method === "sms"
              ? "📱 Text sent. Please enter the code."
              : "📧 Email sent. Please enter the code."}
          </p>
          <input
            type="text"
            placeholder="Enter MFA Code"
            value={mfaCode}
            onChange={(e) => setMfaCode(e.target.value)}
            className={styles.input}
          />
          <button onClick={handleVerifyMfa} className={styles.button}>
            Verify Code
          </button>
        </>
      )}

      {error && <p className={styles.error}>❌ {error}</p>}
    </div>
  );
}

