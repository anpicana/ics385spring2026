// ICS385 Term Project 3

// KPIs: Visitor Arrivals, Average Length of Stay, Visitor Spending

// Task 4: Metric Cards Component - displays key metrics for the selected island (ADR, Occupancy, Avg LOS)

export default function IslandCard ({ name, nickname, segment, avgStay, img }) {
  return (
    <div className="metric-card">
      <IslandCard label="💵 ADR" value="$295 / night" />
      <IslandCard label="🏨 Occupancy" value="78%" />
      <IslandCard label="🗓️ Avg LOS" value="6.2 days" />  
    </div>
  );
}

