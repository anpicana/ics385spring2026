// Week 12// Amenities Section with use of props to display amenities information

function AmenitiesSection(props) {
  return (
    <div className="amenities">
      <h2>Amenities</h2>
      <ul>
        {props.amenities.map((amenity, index) => ( // this part of the code was generated with the help of ChatGPT
          <li key={index}>{amenity}</li>
        ))}
      </ul>
    </div>
  );
}

export default AmenitiesSection;