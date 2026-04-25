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

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);


const LosChart = ({ island }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const loadLos = async () => {
      try {
        const res = await fetch(`/api/los?island=${encodeURIComponent(island)}`);
        if (!res.ok) throw new Error(`LOS fetch failed: ${res.status}`);
        
        const dataFromApi = await res.json();
        setChartData(makeLosChartData(dataFromApi, island));
      } catch (err) {
        console.error("Error fetching LOS data:", err);
        setChartData(null);
      }
    };

    loadLos();
  }, [island]);

  // Simple loading UI
  if (!chartData) return <p>Loading Average Length of Stay...</p>;
  return <Bar data={chartData} />;
};

// Helper function: LOS numbers -> Chart.js bar chart format
const makeLosChartData = (rows, island) => {
  return {
    labels: rows.map((r) => r.month),
    datasets: [
      {
        label: `${island} Length of Stay (days)`,
        data: rows.map((r) => r.los),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };
};

export default LosChart;
