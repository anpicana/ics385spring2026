// Week13 HW13a
// React Part 2

// Task 4: IslandList with .map() and .filter()

import { useState } from 'react';
import IslandCard from './IslandCard';

export default function IslandList({ islands }) {
  const [segment, setSegment] = useState("All");

  const displayed = segment === "All"
    ? islands
    : islands.filter(i => i.segment === segment);
  const segments = ['All', ...new Set(islands.map(i => i.segment))];

  //Task 5: Average Stay Summary with .reduce()
  const avgStay = displayed.length
    ? (displayed.reduce((sum, i) => sum + i.avgStay, 0) / displayed.length).toFixed(1)
    : 0;


  return (
    <>
      <select onChange={e => setSegment(e.target.value)}>
        {segments.map(s => <option key={s}>{s}</option>)}
      </select>

      <div className="grid">
        {displayed.map(island => (
          <IslandCard key={island.id} {...island} />
        ))}
      </div>

      <div className="summary">
        <h2>Average stay: {avgStay} days</h2>
      </div>
    </>
  );
}

