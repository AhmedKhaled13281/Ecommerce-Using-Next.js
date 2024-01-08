// pages/api/auth/getUsers.js

import { getSession } from "next-auth/react";
import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req, res) {
  const session = await getSession({ req });

  const client = new MongoClient(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  const usersCollection = client.db().collection("users");
  try {
    if (req.method === "GET") {
      const users = await usersCollection.find({}).toArray();
      res.status(200).json(users);
    }

    if (req.method == "DELETE") {
      const { id } = req.body;

      const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 1) {
        res
          .status(200)
          .json({ success: true, message: "User deleted successfully." });
      } else {
        res.status(404).json({ error: "User not found." });
      }
    }
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.close();
  }
}
