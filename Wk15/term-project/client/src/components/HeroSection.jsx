// Week 12
// Hero Section; with use of props to display basic hotel information

import { Link } from "react-router-dom"; // code generated with the help of ChatGPT - for "View Dashboard" link in HeroSection

function HeroSection(props) {
  return (
    <div
      className="hero"
      style={{ backgroundImage: `url(${props.image})` }}
    >
      <div className="hero-content">
        <h1>{props.name}</h1>
        <h2>{props.island}</h2>
        <p>{props.tagline}</p>
      </div>

    </div>
  );
}

export default HeroSection;
