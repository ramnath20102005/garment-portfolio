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
      <section className="section section-light hero">
        <div className="container">
          <div className="hero-grid">
            <ScrollAnimatedSection animation="animate-fade-in-left">
              <div className="hero-content">
                <span className="hero-label">The Foundation</span>
                <h1 className="hero-title">
                  {company ? company.name : "Premium Garments"}
                </h1>
                <p className="hero-tagline">
                  Where Heritage Meets modern craftsmanship.
                </p>
                <p className="hero-subtitle">
                  {company ? company.description : "Excellence in manufacturing and global export since 1995."}
                </p>
                <div className="hero-cta">
                  <Link to="/products" className="btn btn-primary">Our Collection</Link>
                  <Link to="/about" className="btn btn-secondary">The Story</Link>
                </div>
              </div>
            </ScrollAnimatedSection>
            <div className="hero-visual">
              <div className="visual-block"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section section-muted philosophy">
        <div className="container">
          <ScrollAnimatedSection animation="animate-fade-in-up">
            <div className="editorial-header">
              <h2 className="section-title">01 / Philosophy</h2>
              <div className="section-divider"></div>
            </div>

            <div className="features-grid">
              <div className="feature-card">
                <h3>Scalable Precision</h3>
                <p>Advanced infrastructure optimized for high-volume, high-quality production cycles.</p>
              </div>
              <div className="feature-card">
                <h3>Global Dialogue</h3>
                <p>Seamless logistics ensuring your vision reaches 40+ international markets.</p>
              </div>
              <div className="feature-card">
                <h3>Ethically Sourced</h3>
                <p>Committed to GOTS-certified sustainable practices across our supply chain.</p>
              </div>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* Stats Block */}
      <section className="section section-dark statistics">
        <div className="container">
          <ScrollAnimatedSection animation="animate-scale-in">
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">30+</span>
                <span className="stat-label">Years of Mastery</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">500K+</span>
                <span className="stat-label">Monthly Capacity</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">98%</span>
                <span className="stat-label">Client Trust</span>
              </div>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section section-light final-cta">
        <div className="container">
          <ScrollAnimatedSection animation="animate-fade-in-up">
            <div className="cta-box">
              <h2 className="section-title">Initiate a Project</h2>
              <p>Join the elite global brands that trust us for their garment manufacturing.</p>
              <Link to="/contact" className="btn btn-primary btn-large">Request Partnership</Link>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>
    </div>
  );
}

export default Home;
