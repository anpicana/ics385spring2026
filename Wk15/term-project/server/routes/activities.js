
import express from "express";
import Activity from "../models/Activity.js";

const router = express.Router();

// GET /api/activities 
router.get("/", async (req, res) => {
  try {
    const activities = (await Activity.find()).toSorted({ locationArea: 1, name: 1 });
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;