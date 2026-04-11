// use of props

function IslandCard(props) {
  return (
    // basic styling template generated with the help of ChatGPT
    <div style={{
      border: "1px solid gray",
      padding: "10px",
      margin: "10px",
      borderRadius: "8px"
    }}> 
      <h2>{props.name}</h2>
      <p>{props.description}</p>
      <p><em><strong>Tip: </ strong>{props.tip}</em></p>
    </div>
  );
}

export default IslandCard;