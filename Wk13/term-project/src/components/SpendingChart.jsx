// ICS385 Term Project 3
// Average Length of Stay Chart (Bar Chart) - displays average spending per visiotr for the selected island

import { UseState, useEffect } from 'react'
import { Bar } from 'ract-chartjs-2';

export default function ArrivalChart({island}) {
  const [chartData, setChartDate] = useState(null);

  useEffect(() => {
    fetch(`/api/arrivals?island=${island}`)
      .then(r => r.json())
      .then(d => setChartDate ({
        labels: d.map(row => row.month),
        datasets: [{ 
          label: `${island} Arrivals`,
          data: d.map(row => row.arrivals),
          backgroundColor: "rgba(75, 192, 192, 0.5)"
        }]
      }));
  }, [island]);

  if (!chartData) return <p>Loading Arrivals...</p>;
  return <Bar data={chartData} />;
}

  ChartJS.register(
  CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend
);

const data = {
  labels: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
  datasets: [{
    label: "Maui Arrivals 2024",
    data: [ 1200, 1500, 1800, 2000, 2200, 2500, 3000, 3500, 4000, 4500, 5000, 5500 ],
    backgroundColor: "rgba(75, 192, 192, 0.5)",
  }]
};

export default function ArrivalChart() {
  return <Bar data={data} />;
}