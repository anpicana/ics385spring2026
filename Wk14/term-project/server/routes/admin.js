// Protected dashboard inaccessible when not logged and shows Property data.

// This code was generated with the use of Week 14 Study Guide and further refined with the help of ChatGPT

import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import Property from "../models/Property.js";

const router = express.Router();

router.get("/dashboard", isAuthenticated, async (req, res) => {
  try {
    const properties = await Property.find({});
    res.render("admin/dashboard", {
      user: req.user,
      propertyName: "Big Island Honeymoon Getaway",
      properties
    });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

export default router;