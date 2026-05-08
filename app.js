const express = require("express");
const cors = require("cors");
require("dotenv").config();

const fs = require("fs");
const path = require("path");

const db = require("./models/db");

const app = express();
const authRoutes = require("./routes/authRoutes");
const prescriptionRoutes = require("./routes/prescriptionRoutes");

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/prescriptions", prescriptionRoutes);

const schemaPath = path.join(__dirname, "./database/hospital.sql");

const schema = fs.readFileSync(schemaPath, "utf8");

db.exec(schema, (err) => {
  if (err) {
    console.error("Error creating tables:", err.message);
  } else {
    console.log("Tables created successfully");
  }
});

// Test Route
app.get("/", (req, res) => {
  res.send("HealthTech Prescription System API Running");
});

// Port
const PORT = process.env.PORT || 5000;

// Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
