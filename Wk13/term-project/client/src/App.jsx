// ICS385 Spring2026
// Term 3 Project
// Week 12 - React Frontend

import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard.jsx";
import { useEffect, useState } from "react";

// Page sections:
import Header from "./components/Header.jsx";
import HeroSection from "./components/HeroSection.jsx";
import AboutSection from "./components/AboutSection.jsx";
import AmenitiesSection from "./components/AmenitiesSection.jsx"; 
import CTASection from "./components/CTASection.jsx";
import Footer from "./components/Footer.jsx";

const MarketingPage = () => {
  const [property, setProperty] = useState(null);
  const propertyId = "69d1b19c95fc731a32e44aa0" // MongoDB property _id

  useEffect(() => {
    //fetch(`api/properties/${propertyId}`)
    //.then((res) => res.json())
    //.then((data) => setProperty(data))
    //.catch((err) => console.error("Property fetch failed: ", err));

    // for testing:
    fetch(`/api/properties/${propertyId}`)
      .then(async (res) => {
        const text = await res.text(); // read raw body
        console.log("STATUS:", res.status);
        console.log("RAW RESPONSE:", text);

      // Only parse JSON if there's something there
       if (!text) throw new Error("Empty response body");
        return JSON.parse(text);
      })
      .then((data) => setProperty(data))
      .catch((err) => console.error("Property fetch failed:", err));
  }, []);
  
  return (
    <>
      <Header />

      {!property ? (
        <p>Loading property...</p>
      ) : (
        <>

          <HeroSection
           name={property.name}
            island={property.island}
            type={property.type}
            image={property.imageURL}
          />
        
          <AboutSection description={property.description} />
          <AmenitiesSection amenities={property.amenities} />
        </>
      )}

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