// Week13 HW13a
// React Part 2

// Task 2: Island Data Array

import IslandList from './IslandList';  
import './App.css';

const islands = [
  { id: 1,
    name: "Maui",
    nickname: "Valley Isle",
    segment: "Honeymoon",
    avgStay: 8.2,
    img: "https://shakablog.s3.us-west-1.amazonaws.com/shakablog/u7mQ4hlZE2CnwaRULHkrsUYXTdKCRWgM8L9EE8FJ.jpeg"
  },
  { id: 2,
    name: "O'ahu",
    nickname: "Gathering Place",
    segment: "First-time",
    avgStay: 7.1,
    img: "https://shakablog.s3.us-west-1.amazonaws.com/shakablog/haH3g0urrcLXaCbLnsovB9GEL2O7cBMpWVpKOG0R.jpeg"
  },
  { id: 3,
    name: "Kaua'i",
    nickname: "Garden Isle",
    segment: "Eco-tourist",
    avgStay: 7.5,
    img: "https://shakablog.s3.us-west-1.amazonaws.com/shakablog/wsOt7l68FzSLHgoOK1u5XxGHEjR74haJDUNsbvQf.jpeg"
  },
  { id: 4,
    name: "Hawai'i",
    nickame: "Big Island",
    segment: "Adventure",
    avgStay: 7.8,
    img: "https://shakablog.s3.us-west-1.amazonaws.com/shakablog/uvmvKBBtDAqmSdbJ0PydYgrr8n4HKsoZcPqrsekn.jpeg"
  },
  { id: 5,
    name: "Moloka'i",
    nickname: "Friendly Isle",
    segment: "Adventure",
    avgStay: 7.1,
    img: "https://shakablog.s3.us-west-1.amazonaws.com/shakablog/LbQeasCAsz2eubEUi5L70SFvALm2r0IPeqZtyq6k.jpeg"
  },
  { id: 6,
    name: "Lana'i",
    nickname: "Pineapple Isle",
    segment: "Eco-tourist",
    avgStay: 3.4,
    img: "https://shakablog.s3.us-west-1.amazonaws.com/shakablog/LbQeasCAsz2eubEUi5L70SFvALm2r0IPeqZtyq6k.jpeg"
  }
];

function App() {
  return (
    <div>
      <h1>The Hawaiian Islands</h1>

      <IslandList islands={islands} />
    </div>
  );
}

export default App;