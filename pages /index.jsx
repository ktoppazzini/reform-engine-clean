// ✅ File: pages/index.jsx

import Link from "next/link";

export default function HomePage() {
  return (
    <div style={{ textAlign: "center", paddingTop: "60px" }}>
      <h1>Welcome to the Reform Engine</h1>
      <p>
        <Link href="/login">Go to Login</Link>
      </p>
      <p>
        <Link href="/reform">Generate Reform Report</Link>
      </p>
    </div>
  );
}
