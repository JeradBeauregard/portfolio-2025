// illustrations apis

// router required
const express = require("express");
const router = express.Router();

// image upload memory and hosting service
const upload = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier"); // budffing service

// import illustrations services

const illustrationService = require("../routes/CaseStudiesApi");


// read

router.get("/getallillustrations", async (request, response)=>{
    try{
const results = await illustrationService.getAllIllustrations();
response.json(results);
    }catch (err) {
        console.error("Router: failed to get case studies", err);
        res.status(500).json({ error: "Internal server error" });
      }
});

router.get("/getillustrationbyid", async (request, response)=>{
    try{
        const {id} = request.params
        const result = await illustrationService.getIllustrationById(id);
        response.json(result);
    }catch (err) {
        console.error("Router: failed to get case study", err);
        res.status(500).json({ error: "Internal server error" });
      }
});

// create a new illustration

router.post("/createnewillustration",upload.single("image") ,async (request, response)=>{
try{
    const data = request.body;
    if (request.file) {
        const streamUpload = () =>
            new Promise((resolve, reject) =>{
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "illustrations" },
                    (error, result) => {
                        if(result) resolve(result);
                        else reject(error);
                    }
                );
                streamifier.createReadStream(request.file.buffer).pipe(stream);
            });

            const result = await streamUpload();
            data.image_url = result.secure_url;
            data.public_id = result.public_id;
    }

    const newIllustration = await illustrationService.createIllustration(data);
    response.status(201).json(newIllustration);
}catch (err) {
      console.error("Router failed to create illustration", err);
      response.status(500).json({ error: "Internal server error" });
    }
});

// update illustration

const streamifier = require("streamifier");

router.put("/updateillustration/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
// find existing image 
    const currentIllustration = await illustrationService.getIllustrationById(id);
    if (!currentIllustration) return res.status(404).json({ error: "Illustration not found" });

    if (req.file) {
// delete existing image
        if (currentIllustration.image_public_id) {
            await cloudinary.uploader.destroy(currentIllustration.image_public_id);
          }

      const streamUpload = () =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "illustrations" }, 
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });

      const result = await streamUpload();
      updateData.image_url = result.secure_url;
    }

    const updated = await illustrationService.updateIllustration(id, updateData);
    if (!updated) return res.status(404).json({ error: "Not found" });
    
    res.status(200).json({ success: true, image_url: updateData.image_url || null });
  } catch (err) {
    console.error("Update with Cloudinary failed:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// delete illustrations

router.delete("/deleteillustration/:id", async (request,response)=>{
try{
    const {id} = request.params;
    const deleteIllustration = await illustrationService.deleteIllustration(id);
    response.status(201).json(deleteIllustration);
}catch (err) {
    console.error("Router failed to delete illustration", err);
    response.status(500).json({error: "Internal server error"});
}
});
