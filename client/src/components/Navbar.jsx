import { Link } from "react-router-dom";
import "./compo_css/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">Premium Garments</span>
          <span className="logo-tagline">Excellence in Manufacturing</span>
        </Link>

        <ul className="navbar-menu">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/about" className="nav-link">About</Link></li>
          <li><Link to="/products" className="nav-link">Products</Link></li>
          <li><Link to="/facilities" className="nav-link">Facilities</Link></li>
          <li><Link to="/exports" className="nav-link">Exports</Link></li>
          <li><Link to="/sustainability" className="nav-link">Sustainability</Link></li>
          <li><Link to="/contact" className="nav-link nav-link-cta">Contact Us</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
