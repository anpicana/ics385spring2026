// This code is generated with the help of ChatGPT

import { useEffect, useState } from "react";
import CTASection from "../components/CTASection.jsx";

const LOCATIONS = ["Hilo", "Kona", "Waimea", "Naalehu"];

export default function HotelsPage() {
  const [hotels, setHotels] = useState([]);
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const hotelsRes = await fetch("/api/properties");
        const hotelsData = await hotelsRes.json();
        setHotels(hotelsData);

        const actRes = await fetch("/api/activities");
        const actData = await actRes.json();
        setActivities(actData);
      } catch (e) {
        setError("Failed to load hotels/activities.");
      }
    }
    load();
  }, []);

  function nearbyActivities(locationArea) {
    if (!LOCATIONS.includes(locationArea)) return [];
    return activities
      .filter((a) => a.locationArea === locationArea)
      .slice(0, 3);
  }

  return (
<div className="page">
  <h1 className="page-title">Explore Hotels</h1>

  {error && <p className="error-text">{error}</p>}

  {hotels.map((hotel) => (
    <div key={hotel._id} className="card" style={{ marginBottom: 16 }}>
      <div className="grid-2">
        <div>
          <h2 className="card-title">{hotel.name}</h2>
          <p><strong>Location:</strong> {hotel.locationArea || "(missing)"}</p>
          <p>{hotel.description}</p>

          {hotel.bookingURL && (
            <a href={hotel.bookingURL} target="_blank" rel="noreferrer">
              Book Now
            </a>
          )}
        </div>

        <div>
          <h3 className="card-title">Suggested Activities Nearby</h3>
          {nearbyActivities(hotel.locationArea).length === 0 ? (
            <p>No suggestions yet.</p>
          ) : (
            <ul className="list">
              {nearbyActivities(hotel.locationArea).map((a) => (
                <li key={a._id}>
                  <strong>{a.name}</strong>
                  <div style={{ fontSize: 13 }}>{a.category}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  ))}

  <CTASection />
</div>
  );
}
