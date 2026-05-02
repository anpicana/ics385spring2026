//About Section --> displays the hotel description


function AboutSection(props) {
  return (
    <div className="about">
      <h2>About</h2>
      
      <h3>{props.description}</h3>
    </div>
  );
}

export default AboutSection;