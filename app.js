// Import dependencies
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// const router = require("./src/routes/api");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const mongoose = require("mongoose");

// Create an express app
const app = express();
app.use(express.json());

// Apply security middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(helmet()); // Set various HTTP headers for security
app.use(hpp()); // Prevent HTTP Parameter Pollution attacks
app.use(mongoSanitize()); // Sanitize user input to prevent NoSQL injection
app.use(express.json({ limit: "50mb" })); // Set maximum request body size
app.use(express.urlencoded({ limit: "50mb" })); // Set maximum request body size

// Parse request bodies
app.use(bodyParser.json());

// Implement rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Connect to the database
let URI = process.env.MONGODB; // Use environment variable for MongoDB URI
let OPTIONS = {
  autoIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  writeConcern: {
    w: "majority",
    j: true,
    wtimeout: 1000,
  },
};

mongoose
  .connect(URI, OPTIONS)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

// Use the router for your routes
// app.use("/", router);

// Handle undefined routes
app.use("*", (req, res) => {
  res.status(404).json({ status: "Fail", data: "Not found" });
});

module.exports = app;
