const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGODB_URI);
let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("portfolio"); // defaults to DB name in URI
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
}

function getDB() {
  if (!db) throw new Error("DB not connected yet. Call connectDB first.");
  return db;
}

module.exports = { connectDB, getDB };
