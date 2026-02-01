import "./page_css/About.css";
import ScrollAnimatedSection from "../components/ScrollAnimatedSection";

function About() {
  return (
    <div className="about">
      {/* Page Header */}
      <section className="section-light about-header">
        <div className="container">
          <ScrollAnimatedSection animation="animate-fade-in-up">
            <h1 className="page-title">V R fashions.</h1>
            <p className="page-subtitle">
              Excellence in knitted garments and global cotton apparel manufacturing.
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
                  Led by Mohan, V R fashions has established itself as a premier destination
                  for high-quality knitted garments. Based in the textile hub of Tiruppur,
                  we specialize in a wide range of cotton-based apparel, from traditional
                  banian cloth to modern streetwear.
                </p>
                <p>
                  Our expertise lies in the nuanced manufacturing of trousers, hoodies,
                  nightwear, and t-shirts. We pride ourselves on our collaborative approach,
                  especially with our custom-designed t-shirts that are tailored to the
                  exact specifications of our international partners in Poland, France, the USA, and UAE.
                </p>
              </div>
            </ScrollAnimatedSection>

            <ScrollAnimatedSection animation="animate-fade-in-right">
              <div className="story-stats">
                <div className="story-stat">
                  <span className="stat-value">2020</span>
                  <span className="stat-text">Established</span>
                </div>
                <div className="story-stat">
                  <span className="stat-value">30+</span>
                  <span className="stat-text">Skilled Artisans</span>
                </div>
                <div className="story-stat">
                  <span className="stat-value">6</span>
                  <span className="stat-text">Major Buyer Nations</span>
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