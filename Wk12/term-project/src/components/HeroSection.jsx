// Week 12
// Hero Section; with use of props to display basic hotel information

// the styling in this file was generated with the help of ChatGPT

function HeroSection(props) {
  return (
    <div 
      style={{
        backgroundImage: `url(${props.image})`,
        backgroundSize: 'cover',
        opacity: 0.8,
        backgroundColor: 'solid gray',
        padding: '100px 20px',
        textAlign: 'center',
      }}>
        <h1>{props.name}</h1>
        <h2><em>{props.island}</em></h2>
        <h2>"{props.tagline}"</h2>
      </div>
  );
}

export default HeroSection;
