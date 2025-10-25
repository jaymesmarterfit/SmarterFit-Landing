export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
    const BASE_ID = process.env.AIRTABLE_BASE_ID;
    const TABLE_NAME = process.env.AIRTABLE_TABLE_NAME;

    console.log('BASE_ID:', BASE_ID);
    console.log('TABLE_NAME:', TABLE_NAME);
    console.log('AIRTABLE_TOKEN:', AIRTABLE_TOKEN);
    console.log("Received:", req.body);



    const response = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          Email: req.body.email,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Airtable Error:', data);
      return res.status(500).json({ error: 'Failed to subscribe. Airtable error.' });
    }

    return res.status(200).json({ message: 'Successfully subscribed!' });
  } catch (err) {
    console.error('Server Error:', err);
    return res.status(500).json({ error: 'Server error. Please try again.' });
  }
}


