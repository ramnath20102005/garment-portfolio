import "./page_css/About.css";
import ScrollAnimatedSection from "../components/ScrollAnimatedSection";

function About() {
  return (
    <div className="about">
      {/* Page Header */}
      <section className="section-light about-header">
        <div className="container">
          <ScrollAnimatedSection animation="animate-fade-in-up">
            <h1 className="page-title">Refining Heritage.</h1>
            <p className="page-subtitle">
              Three decades of excellence in garment manufacturing and global export.
            </p>
            <div className="section-divider"></div>
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* Company Story */}
      <section className="section-muted company-story">
        <div className="container">
          <div className="story-content">
            <ScrollAnimatedSection animation="animate-fade-in-left">
              <div className="story-text">
                <h2>Our Story</h2>
                <div className="section-divider"></div>
                <p>
                  Founded in 1995, Premium Garments began as a small family-owned
                  manufacturing unit with a vision to deliver world-class quality garments
                  to international markets. Over the past three decades, we have grown into
                  a leading manufacturer and exporter, serving clients across 40+ countries.
                </p>
                <p>
                  Our journey has been marked by continuous innovation, unwavering commitment
                  to quality, and a deep understanding of global fashion trends. Today, we
                  operate state-of-the-art facilities equipped with cutting-edge technology.
                </p>
              </div>
            </ScrollAnimatedSection>

            <ScrollAnimatedSection animation="animate-fade-in-right">
              <div className="story-stats">
                <div className="story-stat">
                  <span className="stat-value">1995</span>
                  <span className="stat-text">Established</span>
                </div>
                <div className="story-stat">
                  <span className="stat-value">2000+</span>
                  <span className="stat-text">Employees</span>
                </div>
                <div className="story-stat">
                  <span className="stat-value">40+</span>
                  <span className="stat-text">Countries</span>
                </div>
              </div>
            </ScrollAnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission & Vision - DARK SECTION */}
      <section className="section-dark mission-vision">
        <div className="container">
          <div className="mv-grid">
            <ScrollAnimatedSection animation="animate-fade-in-up" delay={1}>
              <div className="mv-card">
                <div className="mv-icon">🎯</div>
                <h3>Our Mission</h3>
                <p>
                  To manufacture and export premium quality garments that exceed
                  international standards while maintaining sustainable and ethical
                  practices.
                </p>
              </div>
            </ScrollAnimatedSection>

            <ScrollAnimatedSection animation="animate-fade-in-up" delay={2}>
              <div className="mv-card">
                <div className="mv-icon">👁️</div>
                <h3>Our Vision</h3>
                <p>
                  To be recognized globally as the most trusted and innovative garment
                  manufacturer, setting industry benchmarks in quality and sustainability.
                </p>
              </div>
            </ScrollAnimatedSection>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-muted core-values">
        <div className="container">
          <ScrollAnimatedSection animation="animate-fade-in-up">
            <h2 className="section-title">Core Principles</h2>
            <p className="section-subtitle">
              The values that define our craftsmanship
            </p>
            <div className="section-divider" style={{ margin: "0 auto 60px" }}></div>

            <div className="values-grid">
              <div className="value-item"><h4>Quality</h4><p>Uncompromising commitment to excellence.</p></div>
              <div className="value-item"><h4>Integrity</h4><p>Conducting business with total transparency.</p></div>
              <div className="value-item"><h4>Innovation</h4><p>Embracing new technologies at every scale.</p></div>
              <div className="value-item"><h4>Sustainability</h4><p>Committed to eco-friendly manufacturing.</p></div>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-light certifications">
        <div className="container">
          <ScrollAnimatedSection animation="animate-scale-in">
            <h2 className="section-title">Certifications</h2>
            <div className="cert-grid">
              <div className="cert-card"><div className="cert-badge-large">ISO 9001</div><p>Quality System</p></div>
              <div className="cert-card"><div className="cert-badge-large">GOTS</div><p>Organic Standard</p></div>
              <div className="cert-card"><div className="cert-badge-large">WRAP</div><p>Accredited Production</p></div>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>
    </div>
  );
}

export default About;