import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const { txnId } = req.query;
  if (!txnId) return res.status(400).json({ error: "Missing txnId" });

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("phonepe");
    const col = db.collection("payments");
    const doc = await col.findOne({ txnId });

    if (!doc) return res.status(404).json({ status: "not_found" });
    return res.status(200).json({ status: doc.status });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "DB error" });
  } finally {
    await client.close();
  }
}
