// ICS385 Term Project 3
// Average Length of Stay Chart (Bar Chart) - displays average length of stay for the selected island

// the following code is generated with the help of ChatGPT and is meant to be a starting point for Spending/LOS Chart component
// - API ready: tries to fetch from /api/los
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
import { FALLBACK_LOS } from "../data/fallbackData"; // Hardcoded fallback data (use until API route is ready)


ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);

const LosChart = ({ island }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const loadLos = async () => {
      try {
        // Try API first (for when your route is ready)
        const res = await fetch(`/api/los?island=${encodeURIComponent(island)}`);

        // If API returns 404/500, treat it as "not ready"
        if (!res.ok) throw new Error("API not ready");

        const dataFromApi = await res.json(); 

        setChartData(makeLosChartData(dataFromApi, island));
      } catch (err) {
        // Fallback to hardcoded data so page still renders
        // TO DO: Remove fallback when /api/los is complete

        const fallbackRows = FALLBACK_LOS[island] || FALLBACK_LOS["Hawai'i"];
        setChartData(makeLosChartData(fallbackRows, island));
      }
    };

    loadLos();
  }, [island]);

  // Simple loading UI
  if (!chartData) return <p>Loading Average Length of Stay...</p>;

  return <Bar data={chartData} />;
};


// Helper function: LOS numbers -> Chart.js bar chart format
const makeLosChartData = (losNumbers, island) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return {
    labels: months,
    datasets: [
      {
        label: `${island} Length of Stay (days)`,
        data: losNumbers,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };
};

export default LosChart;
