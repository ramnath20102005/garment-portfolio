import "./page_css/Facilities.css";
import ScrollAnimatedSection from "../components/ScrollAnimatedSection";

function Facilities() {
    return (
        <div className="facilities">
            {/* Header */}
            <section className="section section-light facilities-header">
                <div className="container">
                    <ScrollAnimatedSection animation="animate-fade-in-up">
                        <span className="editorial-label">Systems & Infrastructure</span>
                        <h1 className="page-title">The Engine Room.</h1>
                        <p className="page-subtitle">
                            State-of-the-art manufacturing infrastructure designed for precision.
                        </p>
                        <div className="section-divider"></div>
                    </ScrollAnimatedSection>
                </div>
            </section>

            {/* Overview */}
            <section className="section section-muted facilities-overview">
                <div className="container">
                    <div className="overview-content">
                        <ScrollAnimatedSection animation="animate-fade-in-left">
                            <div className="overview-text">
                                <h2>Knitting & Processing</h2>
                                <p>
                                    Located in the heart of Tiruppur, our facility is optimized for
                                    high-volume knitted garment production. We use advanced circular
                                    knitting machinery to produce premium banian cloth and cotton blends.
                                </p>
                            </div>
                        </ScrollAnimatedSection>

                        <ScrollAnimatedSection animation="animate-fade-in-up">
                            <div className="facility-visual">
                                <img src="/facilities.jpeg" alt="V R Fashions Facility" />
                            </div>
                        </ScrollAnimatedSection>

                        <ScrollAnimatedSection animation="animate-fade-in-right">
                            <div className="overview-stats">
                                <div className="facility-stat">
                                    <span className="stat-number">200</span>
                                    <span className="stat-label">Square Feet</span>
                                </div>
                                <div className="facility-stat">
                                    <span className="stat-number">7+</span>
                                    <span className="stat-label">Active Lines</span>
                                </div>
                            </div>
                        </ScrollAnimatedSection>
                    </div>
                </div>
            </section>

            {/* Capability Blocks */}
            <section className="section section-dark technology-section">
                <div className="container">
                    <ScrollAnimatedSection animation="animate-fade-in-up">
                        <div className="tech-header">
                            <h2 className="section-title">Technological Edge</h2>
                            <p>Leveraging fourth-generation automation to eliminate margin for error.</p>
                        </div>

                        <div className="tech-grid">
                            <div className="tech-card">
                                <span className="tech-index">01</span>
                                <h4>Knitting Core</h4>
                                <p>Initially setup with 40 sets of machinery, expanding with 60 more sets in late 2026.</p>
                            </div>
                            <div className="tech-card">
                                <span className="tech-index">02</span>
                                <h4>Safety First</h4>
                                <p>Comprehensive Health and Safety procedures documented and visible for all global audits.</p>
                            </div>
                            <div className="tech-card">
                                <span className="tech-index">03</span>
                                <h4>Export Quality</h4>
                                <p>Strict quality check protocols at every stage to meet US and EU retail standards.</p>
                            </div>
                        </div>
                    </ScrollAnimatedSection>
                </div>
            </section>

            {/* Final CTA */}
            <section className="section section-light facility-cta">
                <div className="container">
                    <ScrollAnimatedSection animation="animate-fade-in-up">
                        <div className="visit-box">
                            <h2>Tour the Facility</h2>
                            <p>We invite global partners to witness our operational excellence in person.</p>
                            <a href="/contact" className="btn btn-primary">Schedule Appointment</a>
                        </div>
                    </ScrollAnimatedSection>
                </div>
            </section>
        </div>
    );
}

export default Facilities;
