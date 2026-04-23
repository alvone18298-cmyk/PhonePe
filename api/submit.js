import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { txnId, luckyName, submittedAt } = req.body;
  if (!txnId || !luckyName) return res.status(400).json({ error: "Missing fields" });

  const client = new MongoClient(uri, { tls: true, tlsAllowInvalidCertificates: false, serverSelectionTimeoutMS: 5000 });
  try {
    await client.connect();
    const db = client.db("phonepe");
    const col = db.collection("payments");

    // Upsert — agar same txnId dubara aaye toh overwrite karo
    await col.updateOne(
      { txnId },
      { $set: { txnId, luckyName, submittedAt, status: "pending", updatedAt: new Date() } },
      { upsert: true }
    );

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "DB error" });
  } finally {
    await client.close();
  }
}
