import fetch from "node-fetch";

export default async function subscribeRoute(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      email,
      name,
      company,
      website,
      monthlyOrders,
      message,
    } = req.body;

    console.log("📩 Incoming pilot request:", {
      email,
      name,
      company,
      website,
      monthlyOrders,
      message,
    });

    const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
    const BASE_ID = process.env.AIRTABLE_BASE_ID;
    const TABLE_NAME = process.env.AIRTABLE_TABLE_NAME;

    if (!AIRTABLE_TOKEN || !BASE_ID || !TABLE_NAME) {
      console.error("❌ Missing env vars", {
        hasToken: !!AIRTABLE_TOKEN,
        hasBaseId: !!BASE_ID,
        hasTableName: !!TABLE_NAME,
      });

      return res.status(500).json({
        error: "Missing Airtable environment variables",
      });
    }

    const airtableUrl = `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}`;

    console.log("📡 Posting to Airtable:", {
      airtableUrl,
      tableName: TABLE_NAME,
      baseId: BASE_ID,
    });

    const response = await fetch(airtableUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          Email: email || "",
          Name: name || "",
          Company: company || "",
          Website: website || "",
          "Monthly Orders": monthlyOrders || "",
          Message: message || "",
        },
      }),
    });

    const data = await response.json();

    console.log("📥 Airtable response status:", response.status);
    console.log("📥 Airtable response data:", data);

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Airtable failed",
        details: data,
      });
    }

    console.log("✅ Successfully added pilot request:", email);
    return res.status(200).json({ success: true, record: data });
  } catch (err) {
    console.error("❌ Server Error:", err);
    return res.status(500).json({
      error: "Server error",
      details: err.message,
    });
  }
}
