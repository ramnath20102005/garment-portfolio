import "./page_css/About.css";

function About() {
  return (
    <div className="about">
      {/* Page Header */}
      <section className="about-header">
        <div className="container">
          <h1 className="page-title">About Premium Garments</h1>
          <p className="page-subtitle">
            Three decades of excellence in garment manufacturing and global export
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="company-story">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>Our Story</h2>
              <p>
                Founded in 1995, Premium Garments began as a small family-owned
                manufacturing unit with a vision to deliver world-class quality garments
                to international markets. Over the past three decades, we have grown into
                a leading manufacturer and exporter, serving clients across 40+ countries.
              </p>
              <p>
                Our journey has been marked by continuous innovation, unwavering commitment
                to quality, and a deep understanding of global fashion trends. Today, we
                operate state-of-the-art facilities equipped with cutting-edge technology
                and employ over 2,000 skilled professionals dedicated to excellence.
              </p>
            </div>
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
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="container">
          <div className="mv-grid">
            <div className="mv-card">
              <div className="mv-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>
                To manufacture and export premium quality garments that exceed
                international standards while maintaining sustainable and ethical
                practices. We strive to be the preferred partner for global brands
                seeking reliability, quality, and innovation.
              </p>
            </div>

            <div className="mv-card">
              <div className="mv-icon">👁️</div>
              <h3>Our Vision</h3>
              <p>
                To be recognized globally as the most trusted and innovative garment
                manufacturer, setting industry benchmarks in quality, sustainability,
                and customer satisfaction. We envision a future where fashion meets
                responsibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="core-values">
        <div className="container">
          <h2 className="section-title">Our Core Values</h2>
          <p className="section-subtitle">
            The principles that guide everything we do
          </p>

          <div className="values-grid">
            <div className="value-item">
              <div className="value-icon">⭐</div>
              <h4>Quality Excellence</h4>
              <p>
                Uncompromising commitment to delivering products that meet the
                highest international quality standards.
              </p>
            </div>

            <div className="value-item">
              <div className="value-icon">🤝</div>
              <h4>Integrity</h4>
              <p>
                Conducting business with honesty, transparency, and ethical
                practices in all our relationships.
              </p>
            </div>

            <div className="value-item">
              <div className="value-icon">💡</div>
              <h4>Innovation</h4>
              <p>
                Continuously embracing new technologies and methods to improve
                our processes and products.
              </p>
            </div>

            <div className="value-item">
              <div className="value-icon">🌍</div>
              <h4>Sustainability</h4>
              <p>
                Committed to eco-friendly manufacturing and responsible resource
                management for a better future.
              </p>
            </div>

            <div className="value-item">
              <div className="value-icon">👥</div>
              <h4>Customer Focus</h4>
              <p>
                Building lasting partnerships through exceptional service and
                understanding client needs.
              </p>
            </div>

            <div className="value-item">
              <div className="value-icon">🚀</div>
              <h4>Continuous Improvement</h4>
              <p>
                Constantly evolving and adapting to exceed expectations and
                stay ahead of industry trends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="certifications">
        <div className="container">
          <h2 className="section-title">Certifications & Compliance</h2>
          <p className="section-subtitle">
            Recognized globally for our commitment to quality and sustainability
          </p>

          <div className="cert-grid">
            <div className="cert-card">
              <div className="cert-badge-large">ISO 9001</div>
              <p>Quality Management System</p>
            </div>
            <div className="cert-card">
              <div className="cert-badge-large">GOTS</div>
              <p>Global Organic Textile Standard</p>
            </div>
            <div className="cert-card">
              <div className="cert-badge-large">OEKO-TEX</div>
              <p>Textile Safety Certification</p>
            </div>
            <div className="cert-card">
              <div className="cert-badge-large">WRAP</div>
              <p>Worldwide Responsible Accredited Production</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;