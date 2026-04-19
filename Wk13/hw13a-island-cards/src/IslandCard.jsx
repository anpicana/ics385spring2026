// Week13 HW13a
// React Part 2

// Task 3: IslandCard Component with Destructured Props
import './App.css';

export default function IslandCard ({ name, nickname, segment, avgStay, img }) {
  return (
    <div className="island-card">
      <img src={img}
      alt={`${name} - ${nickname} island photo`}
      />
      <h2>{name}</h2>
      <p><strong>Nickname:</strong> {nickname}</p>
      <p><strong>Segment:</strong> {segment}</p>
      <p><strong>Average Stay:</strong> {avgStay} days</p>
    </div>
  );
}