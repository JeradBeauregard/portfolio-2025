// Illustrations API routes

const express = require("express");
const router = express.Router();

const upload = require("../middleware/ImageUploadMemory");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const illustrationService = require("../services/IllustrationsServices");

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

/* === GET all illustrations === */
router.get("/getallillustrations", async (req, res) => {
  try {
    const results = await illustrationService.getAllIllustrations();
    res.json(results);
  } catch (err) {
    console.error("Router: failed to get illustrations", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/* === GET illustration by ID === */
router.get("/getillustrationbyid/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await illustrationService.getIllustrationById(id);
    res.json(result);
  } catch (err) {
    console.error("Router: failed to get illustration", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/* === CREATE a new illustration === */
router.post("/createnewillustration", upload.single("image"), async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      const result = await streamUpload(req.file.buffer, "illustrations");
      data.image_url = result.secure_url;
      data.image_public_id = result.public_id;
    }

    const newIllustration = await illustrationService.createIllustration(data);
    res.status(201).json(newIllustration);
  } catch (err) {
    console.error("Router failed to create illustration", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/* === UPDATE an existing illustration === */
router.put("/updateillustration/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const current = await illustrationService.getIllustrationById(id);
    if (!current) return res.status(404).json({ error: "Illustration not found" });

    if (req.file) {
      if (current.image_public_id) {
        await cloudinary.uploader.destroy(current.image_public_id);
      }

      const result = await streamUpload(req.file.buffer, "illustrations");
      updateData.image_url = result.secure_url;
      updateData.image_public_id = result.public_id;
    }

    const updated = await illustrationService.updateIllustration(id, updateData);
    if (!updated) return res.status(404).json({ error: "Update failed" });

    res.status(200).json({ success: true, image_url: updateData.image_url || current.image_url });
  } catch (err) {
    console.error("Update with Cloudinary failed:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/* === DELETE an illustration === */
router.delete("/deleteillustration/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const current = await illustrationService.getIllustrationById(id);
    if (current?.image_public_id) {
      await cloudinary.uploader.destroy(current.image_public_id);
    }

    const deleted = await illustrationService.deleteIllustration(id);
    res.status(200).json(deleted);
  } catch (err) {
    console.error("Router failed to delete illustration", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
