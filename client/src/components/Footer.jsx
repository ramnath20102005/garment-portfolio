import { Link } from "react-router-dom";
import "./compo_css/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">V R fashions</h3>
          <p className="footer-description">
            Specializing in high-quality knitted garments. Led by Mohan, we deliver
            excellence to global markets with a focus on cotton-based apparel.
          </p>
          <div className="footer-certifications">
            <span className="cert-badge">ISO 9001</span>
            <span className="cert-badge">GOTS</span>
            <span className="cert-badge">OEKO-TEX</span>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/facilities">Facilities</Link></li>
            <li><Link to="/sustainability">Sustainability</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Our Services</h4>
          <ul className="footer-links">
            <li><Link to="/exports">Global Exports</Link></li>
            <li><a href="#custom">Custom Manufacturing</a></li>
            <li><a href="#quality">Quality Assurance</a></li>
            <li><a href="#logistics">Logistics Support</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Contact Info</h4>
          <ul className="footer-contact">
            <li>📧 contact@vrfashions.com</li>
            <li>📞 +91 98947 61456</li>
            <li>📍 S.F#85,86 VIVEKANDHA NAGAR, Dharapuram Main Rd, KOVILVALI, Tiruppur, Tamil Nadu 641606</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 V R fashions. All rights reserved.</p>
        <div className="footer-legal">
          <a href="#privacy">Privacy Policy</a>
          <span>•</span>
          <a href="#terms">Terms of Service</a>
          <span>•</span>
          <a href="#sitemap">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;