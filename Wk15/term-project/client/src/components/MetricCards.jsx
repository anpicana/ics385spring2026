// ICS385 Term Project 3
// KPIs: Visitor Arrivals, Average Length of Stay, Visitor Spending

// the code is generated and cleaned up with the help of ChatGPT

import { useEffect, useState } from "react";
import "../App.css";

const MetricCards = ({ island }) => {
  const [arrivalsRows, setArrivalsRows] = useState([]);
  const [spendingRows, setSpendingRows] = useState([]);
  const [losRows, setLosRows] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const loadKpis = async () => {
      try {
        setErrorMsg("");

        const [arrRes, spRes, losRes] = await Promise.all([
          fetch(`/api/arrivals?island=${encodeURIComponent(island)}`),
          fetch(`/api/spending?island=${encodeURIComponent(island)}`),
          fetch(`/api/los?island=${encodeURIComponent(island)}`),
        ]);

        if (!arrRes.ok) throw new Error(`Arrivals API failed: ${arrRes.status}`);
        if (!spRes.ok) throw new Error(`Spending API failed: ${spRes.status}`);
        if (!losRes.ok) throw new Error(`LOS API failed: ${losRes.status}`);

        const [arrData, spData, losData] = await Promise.all([
          arrRes.json(),
          spRes.json(),
          losRes.json(),
        ]);

        setArrivalsRows(arrData); // [{month, arrivals}]
        setSpendingRows(spData);  // [{month, spending}]
        setLosRows(losData);      // [{month, los}]
      } catch (err) {
        console.error("KPI fetch error:", err);
        setErrorMsg(err.message);
        setArrivalsRows([]);
        setSpendingRows([]);
        setLosRows([]);
      }
    };

    loadKpis();
  }, [island]);

  // Loading state (wait until all three arrays have data)
  const isLoading =
    arrivalsRows.length === 0 || spendingRows.length === 0 || losRows.length === 0;

  if (errorMsg) return <p style={{ padding: 8 }}>KPI error: {errorMsg}</p>;
  if (isLoading) return <p style={{ padding: 8 }}>Loading metrics...</p>;

  // 1) Average Monthly Arrivals
  const totalArrivals = arrivalsRows.reduce((sum, row) => sum + Number(row.arrivals || 0), 0);
  const avgMonthlyArrivals = totalArrivals / arrivalsRows.length;

  // 2) Average Monthly Spending
  const totalSpendingMil = spendingRows.reduce((sum, row) => sum + Number(row.spending || 0), 0);
  const avgMonthlySpendingMil = totalSpendingMil / spendingRows.length;
  // Average spending per visitor
  const avgSpendingPerVisitor = avgMonthlyArrivals > 0 ? (avgMonthlySpendingMil * 1_000_000) / avgMonthlyArrivals : 0;


  // 3) Average Length of Stay (REQUIRED: reduce())
  const totalLos = losRows.reduce((sum, row) => sum + Number(row.los || 0), 0);
  const avgLos = totalLos / losRows.length;

  return (
    <div className="grid">
      <div className="metric-card" style={{ padding: 16, margin: 0 }}>
        <h3>✈️ 2025 Visitor Arrivals</h3>
        <p className="metric-value">{avgMonthlyArrivals.toFixed(0)}</p>
        <p className="metric-subtitle">Average Monthly Arrivals</p>
      </div>

      <div className="metric-card" style={{ padding: 16, margin: 0 }}>
        <h3>💳 2025 Monthly Spending</h3>
        <p className="metric-value">${avgSpendingPerVisitor.toFixed(0)}</p>
        <p className="metric-subtitle">Average Monthly Spending per Vistor</p>
      </div>

      <div className="metric-card" style={{ padding: 16, margin: 0 }}>
        <h3>🧳 2025 Length of Stay</h3>
        <p className="metric-value">{avgLos.toFixed(1)} days</p>
        <p className="metric-subtitle">Average Length of Stay</p>
      </div>
    </div>
  );
};

export default MetricCards;