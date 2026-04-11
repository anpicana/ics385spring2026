// ICS385, Spring 2026
//Week 12, HW 12a

//Island Data Array

import Header from "./components/Header";
import IslandCard from "./components/IslandCard";

function App() {
  const islands = [
    {
      id: 1,
      name: "Hawaii Island",
      description: "The largest and youngest island in the Hawaiian archipelago, known for its diverse landscapes and active volcanoes.",
      tip: "Visit Hawaii Volcanoes National Park to see the active Kilauea volcano and explore lava tubes. When visiting the Mauna Kea, be sure to dress warmly, and a 4x4 vehicle is mandatory when visiting the summit."
    },
    {
      id: 2,
      name: "Maui",
      description: "Known as the Valley Isle, famous for Road to Hana and Haleakala.",
      tip: "Visit Haleakala crater at sunrise or sunset for breathtaking views - arrive 30 minutes early. The Road to Hana is a must-see, but be prepared for narrow roads and lots of stops along the way."
    },
    {
      id: 3,
      name: "Oahu",
      description: "Known as the Gathering Isle, the most populous island, home to Honolulu and famous for beaches and culture.",
      tip: "Take TheBus - it covers the entire island and is very affordable. The Holo card is convenient."
    },
    {
      id: 4,
      name: "Kauai",
      description: "Known as the Garden Isle, famous for lush landscapes and the Na Pali Coast.",
      tip: "Visit the Na Pali Coast for stunning views. The Kalalau Trail is popular but requires a permit."
    }
  ];

// Rendering with .map()
// Code generated/fixed with use of ChatGPT
  return (
    <div>
      <Header />

      {islands.map(island => (
        <IslandCard key={island.id} {...island} />
      ))}
    </div>
  );
}

export default App;