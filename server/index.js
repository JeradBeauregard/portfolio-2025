const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config(); // Load environment variables
const { connectDB } = require("./config/db");

const app = express();
const PORT = process.env.PORT || 8888;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/dist")));

// API routes example (uncomment if needed)
// const caseStudyRoutes = require("./routes/caseStudies");
// app.use("/api/case-studies", caseStudyRoutes);

// Serve React frontend for all unmatched routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// api routing

// Start the server
// Connect to MongoDB, then start server
connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  });
