// File: pages/api/login.js

import bcrypt from "bcrypt";
import twilio from "twilio";

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export default async function handler(req, res) {
  console.log("🔒 Login route hit:", req.method);

  if (req.method !== "POST") {
    console.warn("⛔ Invalid method:", req.method);
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, password } = req.body || {};
    console.log("📥 Received login request:", { email, hasPassword: !!password });

    if (!email || !password) {
      return res.status(400).json({ error: "Missing email or password" });
    }

    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableName = "Users";
    const loginLogTable = "Login Attempts";

    const userUrl = `https://api.airtable.com/v0/${baseId}/${tableName}?filterByFormula={Email}="${email}"`;
    console.log("🔗 Fetching user from Airtable:", userUrl);

    const userRes = await fetch(userUrl, {
      headers: {
        Authorization: `Bearer ${airtableApiKey}`,
        "Content-Type": "application/json",
      },
    });

    const rawText = await userRes.text();
    let userData;

    try {
      userData = JSON.parse(rawText);
    } catch (parseErr) {
      console.error("❌ Failed to parse Airtable response:", parseErr);
      console.error("🧾 Raw response text:", rawText);
      await logAttempt(loginLogTable, baseId, airtableApiKey, email, false, "Airtable parse error");
      return res.status(500).json({ error: "Invalid response from user database" });
    }

    if (!userData.records || userData.records.length === 0) {
      await logAttempt(loginLogTable, baseId, airtableApiKey, email, false, "User not found");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const record = userData.records[0];
    const fields = record.fields;
    const storedHash = fields["auth_token_key"];

    if (!storedHash) {
      await logAttempt(loginLogTable, baseId, airtableApiKey, email, false, "Missing password hash");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, storedHash);
    if (!isMatch) {
      await logAttempt(loginLogTable, baseId, airtableApiKey, email, false, "Password mismatch");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // MFA Code Generation
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000).toISOString();
    const phoneNumber = fields["Phone number"];
    const fromNumber = process.env.TWILIO_PHONE_NUMBER;

    if (!phoneNumber || !fromNumber) {
      console.error("❌ Missing phone config (Twilio)");
      return res.status(400).json({ error: "Phone configuration missing" });
    }

    console.log(`📲 Sending MFA code ${verificationCode} to ${phoneNumber}`);

    await twilioClient.messages.create({
      body: `Your Sovereign Ops verification code is: ${verificationCode}`,
      from: fromNumber,
      to: phoneNumber,
    });

    // Store MFA code and expiry
    await fetch(`https://api.airtable.com/v0/${baseId}/${tableName}/${record.id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${airtableApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          "MFA Temp": verificationCode,
          "mfa_code_expiry": expiry,
        },
      }),
    });

    await logAttempt(loginLogTable, baseId, airtableApiKey, email, true, "MFA code sent");

    console.log("✅ Login validated. MFA code sent.");
    return res.status(200).json({ message: "MFA code sent" });

  } catch (err) {
    console.error("🔥 Unexpected error during login:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Log to Airtable
async function logAttempt(table, baseId, apiKey, email, success, notes) {
  try {
    const payload = {
      fields: {
        "User Email": email,
        "Status": success ? "Success" : "Fail",
        "Notes": notes,
        "Timestamp": new Date().toISOString(),
      },
    };

    await fetch(`https://api.airtable.com/v0/${baseId}/${table}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log(`📓 Login attempt logged: [${success ? "✅" : "❌"}] ${notes}`);
  } catch (err) {
    console.warn("⚠️ Failed to log login attempt:", err.message);
  }
}

