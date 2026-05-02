// ICS385 Term Project 3
// Week 13 React: Task 1 - Dashboard Component Structure

// The code below was generated with the help of ChatGPT

import { useState } from "react";
import MetricCards from "./components/MetricCards.jsx";
import ArrivalChart from "./components/ArrivalChart.jsx";
import LosChart from "./components/LosChart.jsx";
import SpendingChart from "./components/SpendingChart.jsx";
import WeatherWidget from "./components/WeatherWidget.jsx";
import CTASection from "./components/CTASection.jsx";


const Dashboard = () => {
  const [island, setIsland] = useState("Hawai'i");

  // Task 5 - weather Widget Integration
  const CITY = {
    "Maui": "Kahului",
    "Hawai'i": "Hilo"
  };

  const city = CITY[island];

  return (
    <main style={{ padding: 24, maxWidth: 1100, margin: "0 auto" }}>
      <header>
        <h1 style={{ margin: 10 }}>Dashboard</h1>
        <p style={{ marginTop: 6 }}>Metrics: Arrivals, Spending, Length of Stay</p>
      </header>

      <section style={{ marginTop: 16 }}>
        <label>
          Island:&nbsp;
          <select value={island} onChange={(e) => setIsland(e.target.value)}>
            <option value="Maui">Maui</option>
            <option value="Hawai'i">Hawai'i</option>
          </select>
        </label>
      </section>

      <section style={{ marginTop: 16 }}>
        <MetricCards island={island} />
      </section>

      <section style={{ marginTop: 16, display: "grid", gap: 16 }}>
        <div style={box}>
          <h2 style={h2}>Visitor Arrivals</h2>
          <ArrivalChart island={island} />
        </div>

        <div style={box}>
          <h2 style={h2}>Visitor Spending</h2>
          <SpendingChart island={island} />
        </div>

        <div style={box}>
          <h2 style={h2}>Average Length of Stay</h2>
          <LosChart island={island} />
        </div>
      </section>

      <section style={{ marginTop: 16 }}>
        <div style={box}>
          <h2 style={h2}>Current Weather</h2>
          <WeatherWidget city={city} />
        </div>
      </section>
      <CTASection />
    </main>
  );
};

const box = { border: "1px solid #ddd", borderRadius: 12, padding: 16 };
const h2 = { marginTop: 0 };

export default Dashboard;
