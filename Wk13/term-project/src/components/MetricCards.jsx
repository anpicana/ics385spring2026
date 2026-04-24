// ICS385 Term Project 3
// KPIs: Visitor Arrivals, Average Length of Stay, Visitor Spending

// Task 4: Metric Cards Component - displays key metrics for the selected island 
// the code is generated with the help of ChatGPT


import "../App.css";
import { FALLBACK_ARRIVALS, FALLBACK_SPENDING, FALLBACK_LOS } from "../data/fallbackData";

const MetricCards = ({ island }) => {
  // 1) ARRIVALS KPI (example: total arrivals for the year = sum of monthly)
  const arrivalsRows = FALLBACK_ARRIVALS[island] || FALLBACK_ARRIVALS["Hawai'i"];
  const totalArrivals = arrivalsRows.reduce((sum, row) => sum + row.arrivals, 0);
  const avgMonthlyArrivals = totalArrivals / arrivalsRows.length;

  // 2) SPENDING KPI (example: average monthly spending = avg of monthly values)
  const spendingRows = FALLBACK_SPENDING[island] || FALLBACK_SPENDING["Hawai'i"];
  const avgSpending =
    spendingRows.reduce((sum, row) => sum + row.spending, 0) / spendingRows.length;

  // 3) LENGTH OF STAY KPI (REQUIRED: use reduce())
  const losArr = FALLBACK_LOS[island] || FALLBACK_LOS["Hawai'i"];
  const avgLos = losArr.reduce((sum, n) => sum + n, 0) / losArr.length;

  return (
    <div className="grid">
      
      <div className="metric-card" style={{ padding: 16, margin: 10 }}>
        <h3>✈️ 2025 Visitor Arrivals</h3>
        <p className="metric-value">{avgMonthlyArrivals.toFixed(0)}</p>
        <p className="metric-subtitle">Average Monthly Arrivals</p>
      </div>

      <div className="metric-card" style={{ padding: 16, margin: 10 }}>
        <h3>💳 2025Visitor Spending</h3>
        <p className="metric-value">${avgSpending.toFixed(0)}</p>
        <p className="metric-subtitle">Average Monthly Spending (in USD)</p>
      </div>

      <div className="metric-card" style={{ padding: 16, margin: 10 }}>
        <h3>🧳 2025Length of Stay</h3>
        <p className="metric-value">{avgLos.toFixed(1)} days</p>
        <p className="metric-subtitle">Average Length of Stay</p>
      </div>

    </div>
  );
};

export default MetricCards;