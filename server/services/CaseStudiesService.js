const { getDB } = require("../config/db");
const { ObjectId } = require("mongodb");

// GET all case studies
async function getAllCaseStudies() {
  const db = getDB();
  return await db.collection("case_studies").find().toArray();
}

// GET one case study by ID
async function getCaseStudyById(id) {
  const db = getDB();
  return await db.collection("case_studies").findOne({ _id: new ObjectId(id) });
}

// CREATE a new case study
async function createCaseStudy(data) {
  try {
    const db = getDB();

    // validation
    if (!data.title || !data.description) {
      throw new Error("Missing required fields: title and description");
    }

    const result = await db.collection("case_studies").insertOne(data);

    if (!result.acknowledged) {
      throw new Error("Failed to insert case study");
    }

    // Return the newly created document with the new _id
    return {
      _id: result.insertedId,
      ...data
    };
  } catch (error) {
    console.error("Service failed to create case study:", error);
    throw error; // route handles
  }
}

// UPDATE an existing case study
async function updateCaseStudy(id, updateData) {
  const db = getDB();
  const result = await db.collection("case_studies").updateOne(
    { _id: new ObjectId(id) },
    { $set: updateData }
  );
  return result.modifiedCount > 0;
}

// DELETE a case study
async function deleteCaseStudy(id) {
  const db = getDB();
  const result = await db.collection("case_studies").deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}

module.exports = {
  getAllCaseStudies,
  getCaseStudyById,
  createCaseStudy,
  updateCaseStudy,
  deleteCaseStudy,
};
