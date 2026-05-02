// This code is generated with the help of ChatGPT

import { useEffect, useState } from "react";
import CTASection from "../components/CTASection.jsx";

const LOCATIONS = ["Hilo", "Kona", "Waimea", "Naalehu"];

export default function ActivitiesPage() {
  const [selected, setSelected] = useState("Kona");
  const [activities, setActivities] = useState([]);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadActivities() {
      try {
        const res = await fetch("/api/activities");
        const data = await res.json();
        setActivities(data);
      } catch (e) {
        setError("Failed to load activities.");
      }
    }
    loadActivities();
  }, []);

  useEffect(() => {
    async function loadWeather() {
      try {
        setWeather(null);
        const res = await fetch(`/api/weather?locationArea=${encodeURIComponent(selected)}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Weather error");
        setWeather(data);
      } catch (e) {
        setWeather({ error: "Weather unavailable." });
      }
    }
    loadWeather();
  }, [selected]);

  const filtered = activities.filter((a) => a.locationArea === selected);

  return (
    <div className="page">
      <h1 className="page-title">Explore Activities</h1>
      {error && <p className="error-text">{error}</p>}

      <label>
        Choose a location:{" "}
        <select value={selected} onChange={(e) => setSelected(e.target.value)}>
          {LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </label>

    <div className="grid-2" style={{ marginTop: 16 }}>
      <div className="card">
        <h2 className="card-title">{selected} Activities</h2>
        {filtered.length === 0 ? (
  <p>No activities found.</p>
) : (
  <div>
    {filtered.map((a) => (
      <div key={a._id} className="activity-card">
        {a.imageURL && (
          <img
            src={a.imageURL}
            alt={`${a.name} photo`}
            style={{
              width: "100%",
              maxHeight: 220,
              objectFit: "cover",
              borderRadius: 12,
              marginBottom: 10
            }}
          />
        )}
        <h4>{a.name}</h4>
      <div style={{ marginTop: 6 }}>{a.description}</div>
    </div>
    ))}
  </div>
)}
      </div>

      <div className="card">
        <h3 className="card-title">Current Weather</h3>
        {!weather ? (
            <p>Loading...</p>
          ) : weather.error ? (
            <p>{weather.error}</p>
          ) : (
            <>
              <p><strong>{weather.city}</strong></p>
              <p>{Math.round(weather.tempF)}°F</p>
              <p style={{ textTransform: "capitalize" }}>{weather.description}</p>
            </>
          )}
      </div>
    </div>

  <CTASection />
</div>
    
  );
};