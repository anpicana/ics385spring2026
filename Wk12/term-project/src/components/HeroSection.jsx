// Week 12
// Hero Section; with use of props to display basic hotel information


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
