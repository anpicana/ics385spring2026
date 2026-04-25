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

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend, Title);

const ArrivalChart = ({ island }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const loadArrivals = async () => {
      try {
        const res = await fetch(`/api/arrivals?island=${encodeURIComponent(island)}`);
        if (!res.ok) throw new Error(`Arrivals fetch failed: ${res.status}`);

        const dataFromApi = await res.json(); // expected: [{month:"Jan", arrivals:123}, ...]
        setChartData(makeArrivalChartData(dataFromApi, island));
      } catch (err) {
        console.error("Error fetching arrivals data:", err);
        setChartData(null);
      }
    };

    loadArrivals();
  }, [island]);

  if (!chartData) return <p>Loading Visitor Arrivals...</p>;
  return <Line data={chartData} />;
};

const makeArrivalChartData = (rows, island) => {
  return {
    labels: rows.map((r) => r.month),
    datasets: [
      {
        label: `${island} Arrivals`,
        data: rows.map((r) => r.arrivals),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.2,
        fill: false,
      },
    ],
  };
};

export default ArrivalChart;
