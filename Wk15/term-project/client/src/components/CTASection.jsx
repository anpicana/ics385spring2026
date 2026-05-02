
// Call-to-Action Section

import { Link } from "react-router-dom";


function CTASection() {
  return (
    <div className="cta">
      <h2>Explore</h2>

      {/* Clickable button that routes to /hotels */}
      <Link to="/hotels">
        <button>Explore Hotels</button>
      </Link>
      {/* Clickable button that routes to /activities */}
      <Link to="/activities">
        <button>Explore Activities</button>
      </Link>
      {/* Clickable button that routes to /dashboard */}
      <Link to="/dashboard">
        <button>View Dashboard</button>
      </Link>
    </div>
  );
}

export default CTASection;