import { Link } from "react-router-dom";
import "./compo_css/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">Premium Garments</h3>
          <p className="footer-description">
            Leading manufacturer and exporter of premium quality garments,
            serving global markets with excellence since 1995.
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
            <li>📧 info@premiumgarments.com</li>
            <li>📞 +1 (555) 123-4567</li>
            <li>📍 Industrial Zone, Manufacturing Hub</li>
            <li>🌐 www.premiumgarments.com</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Premium Garments. All rights reserved.</p>
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