import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db(); // uses default DB name from MongoDB URI
const collection = db.collection("blogs");

// ✅ Export the missing function
export async function saveToMongo(data: {
  url: string;
  fullText: string;
}) {
  const result = await collection.insertOne(data);
  console.log("✅ Saved to MongoDB:", result.insertedId);
}
