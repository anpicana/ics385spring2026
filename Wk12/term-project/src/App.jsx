// ICS385 Spring2026
// Term 3 Project
// Week 12 - React Frontend


import Header from "./components/Header.jsx";
import HeroSection from "./components/HeroSection.jsx";
import AboutSection from "./components/AboutSection.jsx";
import AmenitiesSection from "./components/AmenitiesSection.jsx"; 
import CTASection from "./components/CTASection.jsx";
import Footer from "./components/Footer.jsx";

function App () {

  // this part of the code was generated with the help of ChatGPT
  const amenities = [
    "Pool",
    "Hot Tub",
    "Dining",
    "Gym",
    "Spa",
    "Free Wi-Fi"
  ];
  // /////////////////

  return (
    <>
      <Header />
      
      <HeroSection
        name="Mauna Kea Beach Hotel"
        island="Hawaii Island"
        tagline= "Aloha is more than a greeting, it's the heartbeat."
        image="https://www.maunakearesort.com/images/content/roomssliderlg/koaak-adult-pool-jacquzzi.jpg?01989393944650314"
      />

      <AboutSection />

      <AmenitiesSection amenities={amenities} />

      <CTASection />

      <Footer />
    </>
  );
}

export default App;