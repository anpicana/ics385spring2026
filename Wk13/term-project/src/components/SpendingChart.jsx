// 2025 Monthly Spending Chart (Bar Chart)
// the following code is generated with the help of ChatGPT and is meant to be a starting point for Spending/LOS Chart component
// - API ready: tries to fetch from /api/spending
// - For now: falls back to hardcoded data if the API is not ready

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { FALLBACK_SPENDING } from "../data/fallbackData"; // Hardcoded fallback data (use until API route is ready)

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);


const SpendingChart = ({ island }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const loadSpending = async () => {
      try {
        // Try API first (for when your route is ready)
        const res = await fetch(`/api/spending?island=${encodeURIComponent(island)}`);

        // If API returns 404/500, treat it as "not ready"
        if (!res.ok) throw new Error("API not ready");

        const dataFromApi = await res.json(); // expected: [{month, spending}, ...]

        setChartData(makeChartData(dataFromApi, island));
      } catch (err) {
        // Fallback to hardcoded data so page still renders
        // TO DO: Remove fallback when /api/spending is complete

        const fallbackRows = FALLBACK_SPENDING[island] || FALLBACK_SPENDING["Hawaii"];
        setChartData(makeChartData(fallbackRows, island));
      }
    };

    loadSpending();
  }, [island]);

  // Simple loading UI
  if (!chartData) return <p>Loading Monthly Spending Trends...</p>;

  return <Bar data={chartData} />;
};


// Helper function to convert rows -> chart.js data format
const makeChartData = (rows, island) => {
  return {
    labels: rows.map((row) => row.month),
    datasets: [
      {
        label: `${island} Spending`,
        data: rows.map((row) => row.spending),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };
};

export default SpendingChart;