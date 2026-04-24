// Visitor Arrivals Chart (Line Chart) - displays number of Monthly arrivals for the selected island

// the following code is generated with the help of ChatGPT and is meant to be a starting point for Arrival/Spending/LOS Chart component
// - API ready: tries to fetch from /api/arrivals
// - For now: falls back to hardcoded data if the API is not ready

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
  LineElement,
  PointElement,
} from "chart.js";

import { FALLBACK_ARRIVALS } from "../data/fallbackData"; // Hardcoded fallback data (use until API route is ready)

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend, Title);

const ArrivalChart = ({ island }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const loadArrivals = async () => {
      try {
        // Try API first (for when your route is ready)
        const res = await fetch(`/api/arrivals?island=${encodeURIComponent(island)}`);

        // If API returns 404/500, treat it as "not ready"
        if (!res.ok) throw new Error("API not ready");

        const dataFromApi = await res.json(); // expected: [{month, spending}, ...]

        setChartData(makeChartData(dataFromApi, island));
      } catch (err) {
        // Fallback to hardcoded data so page still renders
        // TO DO: Remove fallback when /api/arrivals is complete

        const fallbackRows = FALLBACK_ARRIVALS[island] || FALLBACK_ARRIVALS["Hawai'i"];
        setChartData(makeChartData(fallbackRows, island));
      }
    };

    loadArrivals();
  }, [island]);

  // Simple loading UI
  if (!chartData) return <p>Loading Monthly Visitor Arrivals...</p>;

  return <Line data={chartData} />;
};


// Helper function to convert rows -> chart.js data format
const makeChartData = (rows, island) => {
  return {
    labels: rows.map((row) => row.month),
    datasets: [
      {
        label: `${island} Visitor Arrivals`,
        data: rows.map((row) => row.arrivals),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        fill: false,
        tension: 0.2,
      },
    ],
  };
};

export default ArrivalChart;