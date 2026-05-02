
// The following codes are generated with the help of ChatGPT
// Properties routes (beginner friendly)
"use strict";

import express from "express"; // Import Express so we can make a router

import Property from "../models/Property.js"; // Import the Property model

const router = express.Router(); // Create a router (handles only /properties routes)

// GET /properties
// Get all properties and render the properties.ejs view
router.get("/", async (req, res) => {
  try {
    const properties = await Property.find({});

    // If this route is being used as an API endpoint, send JSON and STOP.
    if (req.originalUrl.startsWith("/api")) {
      return res.json(properties);
    }

    // Otherwise render the EJS page and STOP.
    return res.render("properties", { properties });
  } catch (err) {
    return res.status(500).send("Server error");
  }
});

// This block of code is generated using the help of ChatGPT/Codex
// GET /properties/top-rated
// Find properties on Hawaii Island with avg review rating >= 4
router.get("/top-rated", async (req, res) => {
  try {
    const results = await Property.aggregate([
      { $match: { island: "Hawaii Island" } },
      { $unwind: "$reviews" },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          island: { $first: "$island" },
          type: { $first: "$type" },
          description: { $first: "$description" },
          avgRating: { $avg: "$reviews.rating" },
          reviewCount: { $sum: 1 }
        }
      },
      { $match: { avgRating: { $gte: 4 } } },
      { $sort: { avgRating: -1 } }
    ]);

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


// GET /properties/:id
// Get one property by its id and return it as JSON.
router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (property == null) return res.status(404).json({ error: "Not found" });
    res.json(property);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST /properties/:id/reviews --> Add a review to one property
// code sopied from Wk 11 Study Guide:
router.post("/:id/reviews", async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (!property) return res.status(404).json({ error: "Not found" });

  property.reviews.push(req.body); // push new review object
  await property.save(); // triggers schema validation
  res.status(201).json(property);
});


// Export the router so app.js can use it.
export default router;