// Code generated with the help of ChatGPT

// import express and Mongoose models
import express from "express";
import Arrival from "../models/Arrival.js";
import Spending from "../models/Spending.js";
import Los from "../models/Los.js";

const router = express.Router();

// Convert "202,416" -> 202416, and numbers pass through
const parseNumber = (x) => {
  if (x === null || x === undefined) return 0;
  const cleaned = String(x).replace(/,/g, "").trim();
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
};

// Build [{month:"Jan", value:...}, ...] from wide doc keys "2025-01"..."2025-12"
const toMonthlySeries = (doc) => {
  const months = [
    ["01", "Jan"], ["02", "Feb"], ["03", "Mar"], ["04", "Apr"],
    ["05", "May"], ["06", "Jun"], ["07", "Jul"], ["08", "Aug"],
    ["09", "Sep"], ["10", "Oct"], ["11", "Nov"], ["12", "Dec"],
  ];

  return months.map(([mm, label]) => ({
    month: label,
    value: parseNumber(doc[`2025-${mm}`]),
  }));
};

// Normalize the UI island name to match DB text
const islandText = (island) => (island === "Hawai'i" ? "Hawaii" : island);

// GET /api/arrivals?island=Hawai'i
router.get("/arrivals", async (req, res) => {
  try {
    const island = req.query.island;
    if (!island) return res.status(400).json({ error: "Missing island query param" });

    const doc = await Arrival.findOne({
      Indicator: /arrivals/i,
      Group: { $regex: islandText(island), $options: "i" },
    }).lean();

    if (!doc) return res.status(404).json({ error: "Arrivals data not found" });

    const series = toMonthlySeries(doc).map((x) => ({ month: x.month, arrivals: x.value }));
    res.json(series);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/spending?island=Hawai'i
router.get("/spending", async (req, res) => {
  try {
    const island = req.query.island;
    if (!island) return res.status(400).json({ error: "Missing island query param" });

    const destination =
      island === "Hawai'i" ? "Hawaii Island" :
      island === "Maui" ? "Maui" : island;

    const doc = await Spending.findOne({
      Indicator: /expenditure/i,
      Destination: { $regex: destination, $options: "i" },
    }).lean();

    if (!doc) return res.status(404).json({ error: "Spending data not found" });

    const series = toMonthlySeries(doc).map((x) => ({ month: x.month, spending: x.value }));
    res.json(series);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/los?island=Hawai'i
router.get("/los", async (req, res) => {
  try {
    const island = req.query.island;
    if (!island) return res.status(400).json({ error: "Missing island query param" });

    const doc = await Los.findOne({
      Indicator: /los/i, // matches "LOS on Hawaii Island"
      Group: { $regex: islandText(island), $options: "i" },
    }).lean();

    if (!doc) return res.status(404).json({ error: "LOS data not found" });

    const series = toMonthlySeries(doc).map((x) => ({ month: x.month, los: x.value }));
    res.json(series);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;