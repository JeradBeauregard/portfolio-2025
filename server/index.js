require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");

const { connectDB } = require("./db");

const app = express();
const PORT = process.env.PORT || 8888;
const FRONT_END = process.env.FRONT_END_URL || "*";

// -------------------------
// CORS
// -------------------------
app.use(cors({
  origin: FRONT_END,
  credentials: true
}));

// -------------------------
// Static File Serving
// -------------------------
app.use(express.static(path.join(__dirname, "..", "client", "dist")));
app.use(express.static(path.join(__dirname, "public"))); // Optional if used

// -------------------------
// Middleware
// -------------------------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// -------------------------
// Routes
// -------------------------
const caseStudyRoutes = require("./routes/CaseStudiesApi");
const illustrationsRoutes = require("./routes/IllustrationsApi");

app.use("/api/casestudies", caseStudyRoutes);
app.use("/api/illustrations", illustrationsRoutes);


// -------------------------
// Start Server
// -------------------------
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
