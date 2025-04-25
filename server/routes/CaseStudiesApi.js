// case study apis

// router required
const express = require("express");
const router = express.Router();

// image upload memory and hosting service
const upload = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier"); // budffing service

// import case study Services

const caseService = require("../services/CaseStudiesService");


// read

router.get("/getallcases", async (request, response)=>{
    try{
        const results = await caseService.getAllCaseStudies();
        response.json(results);
    }catch (err) {
        console.error("Router: failed to get case studies", err);
        res.status(500).json({ error: "Internal server error" });
      }
});

router.get("/getcasebyid/:id",async (request,response)=>{
    try{
        const {id} = request.params;
        const result = await caseService.getCaseStudyById(id);
        response.json(result);
    }catch (err) {
        console.error("Router failed to get case study", err);
        response.status(500).json({error: "Internal server error"});
        
    }
});

// create a new case study
// CREATE case study with thumbnail upload
// WILL NEED TO UPDATE TO HANDLE CASE STUDY IMAGES :)
router.post("/createcasestudy", upload.single("thumbnail"), async (req, res) => {
    try {
      const data = req.body;
  
      // If thumbnail is uploaded
      if (req.file) {
        const streamUpload = () =>
          new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { folder: "case_studies" },
              (error, result) => {
                if (result) resolve(result);
                else reject(error);
              }
            );
            streamifier.createReadStream(req.file.buffer).pipe(stream);
          });
  
        const result = await streamUpload();
        data.thumbnail_url = result.secure_url;
      }
  
      const newCaseStudy = await caseService.createCaseStudy(data);
      res.status(201).json(newCaseStudy);
    } catch (err) {
      console.error("Router failed to create case study", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // update existing case study
// UPDATE with Cloudinary upload
// ONLY SET UP TO UPLOAD THUMBNAILS AT THE MOMENT WILL NEED
// TO UPDATE TO ADD IMAGES FOR CASE STUDIES LATER
router.put("/updatecasestudy/:id", upload.single("thumbnail"), async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
  
      if (req.file) {
        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload_stream(
          { folder: "case_studies" },
          (error, result) => {
            if (error) throw error;
            updateData.thumbnail_url = result.secure_url;
  
            caseService.updateCaseStudy(id, updateData).then((updated) => {
              if (!updated) return res.status(404).json({ error: "Not found" });
              res.status(200).json({ success: true, thumbnail_url: result.secure_url });
            });
          }
        );
  
        // Pipe image buffer to Cloudinary
        streamifier = require("streamifier");
        streamifier.createReadStream(req.file.buffer).pipe(result);
      } else {
        // No image uploaded
        const updated = await caseService.updateCaseStudy(id, updateData);
        res.status(200).json({ success: updated });
      }
    } catch (err) {
      console.error("Update with Cloudinary failed:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // delete a case study


  router.delete("/deletecasestudy/:id", async (request, response)=>{
    try{
        const {id} = request.params;
        const deleteCase = await caseService.deleteCaseStudy(id);
        response.status(201).json(deleteCase);
    }catch (err) {
        console.error("Router failed to delete case study", err);
        response.status(500).json({error: "Internal server error"});
    }
  });


  


module.exports = router; // Export the router