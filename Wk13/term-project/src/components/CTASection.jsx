
// Call-to-Action Section

import { Link } from "react-router-dom";


function CTASection() {
  return (
    <div className="cta">
      <h2>Explore</h2>
      <button>Explore Hotels</button>
      <button>Explore Activities</button>
      
      {/* Clickable button that routes to /dashboard */}
      <Link to="/dashboard">
        <button>View Dashboard</button>
      </Link>
    </div>
  );
}

export default CTASection;