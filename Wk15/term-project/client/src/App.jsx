// ICS385 Spring2026
// Term 3 Project

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
// Hotel & Activities page:
import HotelsPage from "./pages/HotelsPage.jsx";
import ActivitiesPage from "./pages/ActivitiesPage.jsx";

const MarketingPage = () => {
  const [property, setProperty] = useState(null);
  const propertyId = "69f5ccf60fdf39c13dff3091" // MongoDB property _id for Hilton Waikoloa village

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
      {/* Hotels page */}
      <Route path="/hotels" element={<HotelsPage />} />
      {/* Activities page */}
      <Route path="/activities" element={<ActivitiesPage />} />

    </Routes>
  );
}

export default App;