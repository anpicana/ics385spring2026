// ICS385 Spring2026
// Term 3 Project
// Week 12 - React Frontend

import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard.jsx";

import Header from "./components/Header.jsx";
import HeroSection from "./components/HeroSection.jsx";
import AboutSection from "./components/AboutSection.jsx";
import AmenitiesSection from "./components/AmenitiesSection.jsx"; 
import CTASection from "./components/CTASection.jsx";
import Footer from "./components/Footer.jsx";


const MarketingPage = () => {
  const amenities = ["Pool", "Hot Tub", "Dining", "Gym", "Spa", "Free Wi-Fi"];  // this code generated using ChatGPT - to pass amenities as props to AmenitiesSection
  
  return (
    <>
      <Header />

      <HeroSection
        name="Mauna Kea Beach Hotel"
        island="Hawaii Island"
        tagline="Aloha is more than a greeting, it's the heartbeat."
        image="https://www.maunakearesort.com/images/content/roomssliderlg/koaak-adult-pool-jacquzzi.jpg?01989393944650314"
      />

      <AboutSection />
      <AmenitiesSection amenities={amenities} />
      <CTASection />
      <Footer />
    </>
  );
};

// The code below was generated with the help of ChatGPT - to set up routing between MarketingPage and Dashboard
function App() {
  return (
    <Routes>
      {/* Marketing page */}
      <Route path="/" element={<MarketingPage />} />

      {/* Dashboard page */}
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;