import "./page_css/Exports.css";

function Exports() {
  return (
    <div className="exports">
      {/* Page Header */}
      <section className="exports-header">
        <div className="container">
          <h1 className="page-title">Global Export Network</h1>
          <p className="page-subtitle">
            Serving international markets with reliability and excellence
          </p>
        </div>
      </section>

      {/* Export Overview */}
      <section className="export-overview">
        <div className="container">
          <div className="overview-grid">
            <div className="overview-content">
              <h2>Worldwide Presence</h2>
              <p>
                With over three decades of export experience, we have established
                strong partnerships with retailers, brands, and distributors across
                40+ countries. Our global network ensures seamless delivery and
                consistent quality regardless of destination.
              </p>
              <p>
                We understand the complexities of international trade and provide
                comprehensive support including documentation, customs clearance,
                logistics coordination, and compliance with regional regulations.
              </p>
            </div>
            <div className="export-stats">
              <div className="export-stat">
                <span className="stat-value">40+</span>
                <span className="stat-label">Countries Served</span>
              </div>
              <div className="export-stat">
                <span className="stat-value">500K+</span>
                <span className="stat-label">Units Exported Monthly</span>
              </div>
              <div className="export-stat">
                <span className="stat-value">98%</span>
                <span className="stat-label">On-Time Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Markets Served */}
      <section className="markets-section">
        <div className="container">
          <h2 className="section-title">Key Markets</h2>
          <p className="section-subtitle">
            Our products reach customers across major global regions
          </p>

          <div className="markets-grid">
            <div className="market-card">
              <div className="market-icon">🇺🇸</div>
              <h3>North America</h3>
              <p>
                United States, Canada, and Mexico - serving major retail chains
                and fashion brands with consistent quality and timely delivery.
              </p>
              <div className="market-highlights">
                <span className="highlight">Major Retail Chains</span>
                <span className="highlight">Fashion Brands</span>
              </div>
            </div>

            <div className="market-card">
              <div className="market-icon">🇪🇺</div>
              <h3>Europe</h3>
              <p>
                UK, Germany, France, Italy, and other European nations - meeting
                strict EU compliance standards and quality requirements.
              </p>
              <div className="market-highlights">
                <span className="highlight">EU Compliance</span>
                <span className="highlight">Premium Quality</span>
              </div>
            </div>

            <div className="market-card">
              <div className="market-icon">🌏</div>
              <h3>Asia-Pacific</h3>
              <p>
                Australia, Japan, South Korea, and Southeast Asia - catering to
                diverse market preferences and regional trends.
              </p>
              <div className="market-highlights">
                <span className="highlight">Regional Trends</span>
                <span className="highlight">Fast Turnaround</span>
              </div>
            </div>

            <div className="market-card">
              <div className="market-icon">🌍</div>
              <h3>Middle East & Africa</h3>
              <p>
                UAE, Saudi Arabia, South Africa, and emerging markets - providing
                culturally appropriate designs and reliable service.
              </p>
              <div className="market-highlights">
                <span className="highlight">Cultural Sensitivity</span>
                <span className="highlight">Growing Markets</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Export Services */}
      <section className="export-services">
        <div className="container">
          <h2 className="section-title">Comprehensive Export Services</h2>

          <div className="services-grid">
            <div className="service-item">
              <div className="service-icon">📋</div>
              <h4>Documentation Support</h4>
              <p>Complete export documentation including invoices, packing lists, certificates of origin, and customs declarations.</p>
            </div>

            <div className="service-item">
              <div className="service-icon">🚢</div>
              <h4>Logistics Coordination</h4>
              <p>Partnership with leading freight forwarders for sea, air, and land transportation with real-time tracking.</p>
            </div>

            <div className="service-item">
              <div className="service-icon">✅</div>
              <h4>Compliance Management</h4>
              <p>Ensuring all products meet destination country regulations, safety standards, and labeling requirements.</p>
            </div>

            <div className="service-item">
              <div className="service-icon">💼</div>
              <h4>Trade Finance</h4>
              <p>Flexible payment terms including LC, TT, and other internationally accepted payment methods.</p>
            </div>

            <div className="service-item">
              <div className="service-icon">📦</div>
              <h4>Custom Packaging</h4>
              <p>Tailored packaging solutions to meet specific market requirements and brand guidelines.</p>
            </div>

            <div className="service-item">
              <div className="service-icon">🔒</div>
              <h4>Insurance Coverage</h4>
              <p>Comprehensive cargo insurance options to protect shipments during international transit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="export-certifications">
        <div className="container">
          <h2 className="section-title">Export Certifications</h2>
          <div className="cert-badges">
            <div className="cert-badge">ISO 9001:2015</div>
            <div className="cert-badge">GOTS Certified</div>
            <div className="cert-badge">OEKO-TEX Standard 100</div>
            <div className="cert-badge">WRAP Certified</div>
            <div className="cert-badge">BCI Member</div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="export-cta">
        <div className="container">
          <h2>Ready to Start Exporting?</h2>
          <p>
            Contact us to discuss your export requirements and discover how we can
            help you reach global markets with confidence.
          </p>
          <a href="/contact" className="btn btn-primary">Get Export Quote</a>
        </div>
      </section>
    </div>
  );
}

export default Exports;
