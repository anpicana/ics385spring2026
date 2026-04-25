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

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);

const SpendingChart = ({ island }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const loadSpending = async () => {
      try {
        const res = await fetch(`/api/spending?island=${encodeURIComponent(island)}`);
        if (!res.ok) throw new Error(`Spending fetch failed: ${res.status}`);

        const dataFromApi = await res.json(); // expected: [{month:"Jan", spending:1897}, ...]
        setChartData(makeSpendingChartData(dataFromApi, island));
      } catch (err) {
        console.error("Error fetching spending data:", err);
        setChartData(null);
      }
    };

    loadSpending();
  }, [island]);

  if (!chartData) return <p>Loading Visitor Spending...</p>;
  return <Bar data={chartData} />;
};

const makeSpendingChartData = (rows, island) => {
  return {
    labels: rows.map((r) => r.month),
    datasets: [
      {
        label: `${island} Spending`,
        data: rows.map((r) => r.spending),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };
};

export default SpendingChart;
