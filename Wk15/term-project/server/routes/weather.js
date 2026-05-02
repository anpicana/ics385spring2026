// weather widget for Activities Page

import express from "express";

const router = express.Router();

// Map locationArea --> OpenWeather city query (4 fixed locations)
const LOCATION_TO_CITY = {
  Hilo: "Hilo",
  Kona: "Kailua-Kona",
  Waimea: "Waimea",
  Naalehu: "Naalehu"
}; 

router.get("/", async (req, res) => {
  try {
    const locationArea = req.query.locationArea;
    const city = LOCATION_TO_CITY[locationArea];

    if (!city) {
      return res.status(400).json({ error: "Invalid locationArea" });
    }

    const key = process.env.OPENWEATHER_API_KEY;
    if (!key) return res.status(500).json({ error: "Missing OPENWEATHER_API_KEY" });

    const url = 
      `https://api.openweathermap.org/data/2.5/weather` +
      `?q=${encodeURIComponent(city)},US&units=imperial&appid=${key}`;

    const resp = await fetch(url);
    const data = await resp.json();

    if (!resp.ok) return res.status(resp.status).json(data);

    res.json({
      city: data.name,
      tempF: data.main?.temp,
      description: data.weather?.[0]?.description
    });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;