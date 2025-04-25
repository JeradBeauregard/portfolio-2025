require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");

const { connectDB } = require("./db");

const app = express();
const PORT = process.env.PORT || 8888;
const FRONT_END = process.env.FRONT_END_URL || "*";

// -------------------------
// Middleware
// -------------------------
app.use(cors({
  origin: FRONT_END,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -------------------------
// API Routes
// -------------------------
const caseStudyRoutes = require("./routes/CaseStudiesApi");
const illustrationsRoutes = require("./routes/IllustrationsApi");

app.use("/api/casestudies", caseStudyRoutes);
app.use("/api/illustrations", illustrationsRoutes);

// -------------------------
// Static File Serving (for Production)
// -------------------------
app.use(express.static(path.join(__dirname, "..", "client", "dist")));

// React Router Fallback: serve index.html for any non-API route
app.get("*", (req, res) => {
  // If it's an API route, skip (you could refine this if needed)
  if (req.originalUrl.startsWith("/api")) {
    return res.status(404).json({ error: "API route not found." });
  }
  res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
});

// -------------------------
// Start Server
// -------------------------
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error("❌ Failed to connect to MongoDB:", err);
  process.exit(1);
});
