import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ScrollAnimatedSection from "../components/ScrollAnimatedSection";
import "./page_css/Home.css";
import "../styles/scrollAnimations.css";

function Home() {
  const [company, setCompany] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/company")
      .then(res => res.json())
      .then(data => setCompany(data))
      .catch(err => console.error("Error fetching company data:", err));
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            {company ? company.name : "Premium Garments"}
          </h1>
          <p className="hero-subtitle">
            {company ? company.description : "Excellence in Manufacturing & Global Export"}
          </p>
          <p className="hero-detail">
            {company && `Established in ${company.establishedYear} • Located in ${company.location}`}
          </p>
          <div className="hero-cta">
            <Link to="/products" className="btn btn-primary">Explore Products</Link>
            <Link to="/contact" className="btn btn-secondary">Get in Touch</Link>
          </div>
        </div>
        <div className="hero-overlay"></div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose Us</h2>
          <p className="section-subtitle">
            Leading the industry with innovation, quality, and reliability
          </p>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏭</div>
              <h3>State-of-the-Art Facilities</h3>
              <p>
                Modern manufacturing infrastructure equipped with cutting-edge
                technology and automated production lines for superior quality.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🌍</div>
              <h3>Global Export Network</h3>
              <p>
                Serving clients across 40+ countries with reliable logistics,
                timely delivery, and comprehensive export documentation support.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">✓</div>
              <h3>Quality Assurance</h3>
              <p>
                ISO 9001 certified processes with rigorous quality control at
                every stage, ensuring products meet international standards.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🌱</div>
              <h3>Sustainable Practices</h3>
              <p>
                Committed to eco-friendly manufacturing with GOTS certification,
                organic materials, and responsible production methods.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <ScrollAnimatedSection animation="animate-scale-in">
        <section className="statistics">
          <div className="container">
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">30+</div>
                <div className="stat-label">Years of Excellence</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">40+</div>
                <div className="stat-label">Countries Served</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">500K+</div>
                <div className="stat-label">Units Monthly</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">98%</div>
                <div className="stat-label">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimatedSection>

      {/* Call to Action */}
      <ScrollAnimatedSection animation="animate-fade-in-up">
        <section className="cta-section">
          <div className="container">
            <h2>Ready to Partner With Us?</h2>
            <p>
              Join hundreds of satisfied clients worldwide who trust us for their
              garment manufacturing needs.
            </p>
            <Link to="/contact" className="btn btn-primary btn-large">
              Start Your Project Today
            </Link>
          </div>
        </section>
      </ScrollAnimatedSection>
    </div>
  );
}

export default Home;
