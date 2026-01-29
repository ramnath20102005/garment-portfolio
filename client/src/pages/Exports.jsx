import "./page_css/Exports.css";
import ScrollAnimatedSection from "../components/ScrollAnimatedSection";

function Exports() {
  return (
    <div className="exports">
      {/* Header */}
      <section className="section section-light exports-header">
        <div className="container">
          <ScrollAnimatedSection animation="animate-fade-in-up">
            <span className="editorial-label">Global Logistics</span>
            <h1 className="page-title">Worldwide Bound.</h1>
            <p className="page-subtitle">
              Serving international markets with relentless precision and documented reliability.
            </p>
            <div className="section-divider"></div>
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* Markets - Muted Grid */}
      <section className="section section-muted markets-section">
        <div className="container">
          <ScrollAnimatedSection animation="animate-fade-in-up">
            <div className="editorial-header">
              <h2 className="section-title">Major Territories</h2>
              <p>Establishing localized supply chains for global retail leaders.</p>
            </div>

            <div className="markets-grid">
              <div className="market-card">
                <span className="market-geo">NA</span>
                <h3>North America</h3>
                <div className="section-divider"></div>
                <p>US & Canadian retail hubs with direct-to-warehouse logistics.</p>
              </div>
              <div className="market-card">
                <span className="market-geo">EU</span>
                <h3>European Union</h3>
                <div className="section-divider"></div>
                <p>Strict compliance with GRS and REACH chemical standards.</p>
              </div>
              <div className="market-card">
                <span className="market-geo">APAC</span>
                <h3>Asia Pacific</h3>
                <div className="section-divider"></div>
                <p>Fast-turnaround models for the high-frequency Australian market.</p>
              </div>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* Stats - Dark Section */}
      <section className="section section-dark export-stats-section">
        <div className="container">
          <ScrollAnimatedSection animation="animate-scale-in">
            <div className="stats-editorial">
              <div className="huge-stat">
                <span className="value">40+</span>
                <span className="label">Nations Served</span>
              </div>
              <div className="stat-desc">
                <p>Documented transit routes to major global ports with real-time customs clearance.</p>
              </div>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section section-light export-cta">
        <div className="container">
          <ScrollAnimatedSection animation="animate-fade-in-up">
            <div className="cta-centered">
              <h2>Global Expansion</h2>
              <p>Discuss your territory requirements with our international trade desk.</p>
              <a href="/contact" className="btn btn-primary">Initiate Export Query</a>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>
    </div>
  );
}

export default Exports;
