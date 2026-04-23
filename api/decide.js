import { MongoClient } from "mongodb";
 
const uri = process.env.MONGODB_URI;
 
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") return res.status(200).end();
 
  const { txnId, action } = req.query;
  if (!txnId || !action) return res.status(400).send("Missing params");
  if (!["APPROVED", "REJECTED"].includes(action)) return res.status(400).send("Invalid action");
 
  const client = new MongoClient(uri, { tls: true, tlsAllowInvalidCertificates: false, serverSelectionTimeoutMS: 5000 });
  try {
    await client.connect();
    const db = client.db("phonepe");
    const col = db.collection("payments");
    await col.updateOne({ txnId }, { $set: { status: action, decidedAt: new Date() } });
 
    // Show a nice confirmation page to admin
    const color  = action === "APPROVED" ? "#30d158" : "#ff453a";
    const emoji  = action === "APPROVED" ? "✅" : "❌";
    const label  = action === "APPROVED" ? "APPROVED" : "REJECTED";
 
    return res.status(200).send(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Admin Action</title>
  <style>
    body{margin:0;background:#000;font-family:system-ui,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh}
    .card{background:#1c1c1e;border-radius:20px;padding:40px 32px;text-align:center;border:1px solid #38383a;max-width:340px;width:90%}
    .emoji{font-size:64px;margin-bottom:16px}
    .title{font-size:24px;font-weight:800;color:${color};margin-bottom:8px}
    .sub{font-size:14px;color:#8e8e93;line-height:1.6}
    .txn{color:#a78fff;font-weight:700}
  </style>
</head>
<body>
  <div class="card">
    <div class="emoji">${emoji}</div>
    <div class="title">${label}</div>
    <div class="sub">Transaction <span class="txn">${txnId}</span><br>has been ${label.toLowerCase()}.<br><br>You can close this tab.</div>
  </div>
</body>
</html>`);
  } catch (e) {
    console.error(e);
    return res.status(500).send("DB error");
  } finally {
    await client.close();
  }
}
 
