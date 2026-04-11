// The following codes are generated with the help of ChatGPT

// Term Project 3 - main server file (beginner friendly)
"use strict";

import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env (for MONGO_URI)

// Import libraries needed
import express from "express";
import mongoose from "mongoose";

import propertyRoutes from "./routes/properties.js"; // Import the properties router

const app = express(); // Create the Express app (the web server)

// Middleware to read form data and JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Tell Express we will use EJS for views
app.set("view engine", "ejs");

// Connect to MongoDB using MONGO_URI from the .env file
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Use the properties router at /properties
app.use("/properties", propertyRoutes);

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
