// Case Study API Routes

const express = require("express");
const router = express.Router();

const upload = require("../middleware/ImageUploadMemory");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const caseService = require("../services/CaseStudiesService");

// Utility: Stream upload to Cloudinary
const streamUpload = (fileBuffer, folder) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });

/* === GET all case studies === */
router.get("/getallcases", async (req, res) => {
  try {
    const results = await caseService.getAllCaseStudies();
    res.json(results);
  } catch (err) {
    console.error("Router: failed to get case studies", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/* === GET a case study by ID === */
router.get("/getcasebyid/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await caseService.getCaseStudyById(id);
    res.json(result);
  } catch (err) {
    console.error("Router failed to get case study", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/* === CREATE a new case study === */
router.post("/createcasestudy", upload.single("thumbnail"), async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      const result = await streamUpload(req.file.buffer, "case_studies");
      data.thumbnail_url = result.secure_url;
      data.thumbnail_public_id = result.public_id;
    }

    const newCaseStudy = await caseService.createCaseStudy(data);
    res.status(201).json(newCaseStudy);
  } catch (err) {
    console.error("Router failed to create case study", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/* === UPDATE an existing case study === */
router.put("/updatecasestudy/:id", upload.single("thumbnail"), async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const current = await caseService.getCaseStudyById(id);
    if (!current) return res.status(404).json({ error: "Case study not found" });

    if (req.file) {
      if (current.thumbnail_public_id) {
        await cloudinary.uploader.destroy(current.thumbnail_public_id);
      }

      const result = await streamUpload(req.file.buffer, "case_studies");
      updateData.thumbnail_url = result.secure_url;
      updateData.thumbnail_public_id = result.public_id;
    }

    const updated = await caseService.updateCaseStudy(id, updateData);
    if (!updated) return res.status(404).json({ error: "Update failed" });

    res.status(200).json({ success: true, thumbnail_url: updateData.thumbnail_url || current.thumbnail_url });
  } catch (err) {
    console.error("Update with Cloudinary failed:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/* === DELETE a case study === */
router.delete("/deletecasestudy/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const current = await caseService.getCaseStudyById(id);
    if (current?.thumbnail_public_id) {
      await cloudinary.uploader.destroy(current.thumbnail_public_id);
    }

    const deleted = await caseService.deleteCaseStudy(id);
    res.status(200).json(deleted);
  } catch (err) {
    console.error("Router failed to delete case study", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
