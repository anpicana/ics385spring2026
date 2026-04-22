// ICS385 Term Project 3
// Task 3: Chart 2
// Donut Chart

import { Doughnut } from 'react-chartjs-2';
import { ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const origin = {
  labels: ["U.S. Domestic", "Japan", "Canada", "Other"],
  datasets: [{
    data: [60, 20, 10, 10],
    backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0"],
  }]
};

export default function OriginChart() {
  return <Doughnut data={origin} />;
}

