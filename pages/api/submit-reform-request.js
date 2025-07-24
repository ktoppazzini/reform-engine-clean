export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const data = req.body;

  try {
    const webhookResponse = await fetch('https://hook.us2.make.com/qf0i3v8ufv007x1414n2p2o3676j46in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!webhookResponse.ok) {
      console.error('Webhook failed:', await webhookResponse.text());
      return res.status(500).json({ success: false });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error submitting to Make:', error);
    res.status(500).json({ success: false });
  }
}
