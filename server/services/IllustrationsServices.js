const { getDB } = require("../config/db");
const { ObjectId } = require("mongodb");

// GET all illustrations
async function getAllIllustrations() {
  const db = getDB();
  return await db.collection("illustrations").find().toArray();
}

// GET a single illustration by ID
async function getIllustrationById(id) {
  const db = getDB();
  return await db.collection("illustrations").findOne({ _id: new ObjectId(id) });
}

// CREATE a new illustration
async function createIllustration(data) {
  const db = getDB();
  const result = await db.collection("illustrations").insertOne(data);
  if (!result.acknowledged) throw new Error("Failed to insert illustration");

  return {
    _id: result.insertedId,
    ...data,
  };
}

// UPDATE an illustration by ID
async function updateIllustration(id, updateData) {
  const db = getDB();
  const result = await db.collection("illustrations").updateOne(
    { _id: new ObjectId(id) },
    { $set: updateData }
  );
  return result.modifiedCount > 0;
}

// DELETE an illustration by ID
async function deleteIllustration(id) {
  const db = getDB();
  const result = await db.collection("illustrations").deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}

module.exports = {
  getAllIllustrations,
  getIllustrationById,
  createIllustration,
  updateIllustration,
  deleteIllustration,
};
