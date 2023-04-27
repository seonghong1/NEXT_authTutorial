import { connectDatabase } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(422).json({ message: "undefind data" });
      return;
    }
    const client = await connectDatabase();
    const db = client.db();

    const existingUser = await db.collection("users").findOne({ email: email });
    if (existingUser) {
      res.status(422).json({ message: "already signup" });
      client.close();
      return;
    }
    const hashedPassword = await hashPassword(password);
    const result = await db.collection("users").insertOne({
      email: email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "insert success", result: result });
    client.close();
  }
}
export default handler;
