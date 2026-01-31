import { Link, NavLink } from "react-router-dom";
import "./compo_css/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">V R fashions</span>
          <span className="logo-tagline">Excellence in Knitted Garments</span>
        </Link>

        <ul className="navbar-menu">
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/facilities" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              Facilities
            </NavLink>
          </li>
          <li>
            <NavLink to="/exports" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              Exports
            </NavLink>
          </li>
          <li>
            <NavLink to="/sustainability" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              Sustainability
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? "nav-link nav-link-cta active" : "nav-link nav-link-cta")}>
              Contact Us
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
