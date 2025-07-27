import bcrypt from 'bcryptjs';
import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { email, password, mfa } = req.body;

  if (!email || !password || !mfa) {
    await logAttempt(null, email || 'Missing', 'Fail', 'Missing credentials');
    return res.status(400).json({ error: 'Email, password, and MFA are required.' });
  }

  try {
    // Step 1: Find user by email
    const users = await base('Users')
      .select({
        filterByFormula: `{Email} = '${email}'`,
        maxRecords: 1,
      })
      .firstPage();

    if (users.length === 0) {
      await logAttempt(null, email, 'Fail', 'Email not found');
      return res.status(401).json({ error: 'Invalid login credentials' });
    }

    const user = users[0];
    const recordId = user.id;
    const storedHash = user.fields['PasswordHash'];
    const mfaCode = (user.fields['MFA Temp'] || '').toString();

    // Step 2: Compare bcrypt password
    const passwordMatch = await bcrypt.compare(password, storedHash);

    if (!passwordMatch) {
      await logAttempt(recordId, email, 'Fail', 'Password mismatch');
      return res.status(401).json({ error: 'Invalid login credentials' });
    }

    // Step 3: Validate MFA
    if (mfa !== mfaCode) {
      await logAttempt(recordId, email, 'Fail', 'MFA mismatch');
      return res.status(401).json({ error: 'Invalid MFA code' });
    }

    // Step 4: Log success
    await logAttempt(recordId, email, 'Success', 'Login success');

    // Optional: Add JWT/session logic here if needed
    return res.status(200).json({ message: 'Login successful' });

  } catch (error) {
    console.error('Login handler error:', error);
    return res.status(500).json({ error: 'Server error during login' });
  }
}

// 🔐 Logging login attempts into Airtable
async function logAttempt(userId, email, status, note) {
  try {
    const ip = ''; // You can insert req.headers['x-forwarded-for'] if passed from frontend

    const logEntry = {
      'IP Address': ip,
      'Status': status,
      'Notes': note,
      'User Email': userId ? [userId] : undefined,
    };

    await base('Login Attempts').create(logEntry);
  } catch (logErr) {
    console.error('Login attempt log error:', logErr);
  }
}
