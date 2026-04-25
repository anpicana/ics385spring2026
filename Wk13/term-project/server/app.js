// The following codes are generated with the help of ChatGPT

// Term Project 3 - main server file (beginner friendly)
"use strict";

import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env (for MONGO_URI)

// Import libraries needed
import express from "express";
import mongoose from "mongoose";

import propertyRoutes from "./routes/properties.js"; // Import the properties router
import chartRoutes from "./routes/chartRoutes.js";

const app = express(); // Create the Express app (the web server)

// Middleware to read form data and JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Tell Express we will use EJS for views -- optional
app.set("view engine", "ejs");

// Mount week 13 Chart routes
app.use("/api", chartRoutes);
// Mount routes (Week 11 + Week 13 alias)
app.use("/properties", propertyRoutes);
app.use("/api/properties", propertyRoutes);


// Connect to MongoDB using MONGO_URI from the .env file
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
