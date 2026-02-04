import "./page_css/Sustainability.css";
import ScrollAnimatedSection from "../components/ScrollAnimatedSection";

function Sustainability() {
    return (
        <div className="sustainability">
            {/* Header */}
            <section className="section section-light sustainability-header">
                <div className="container">
                    <ScrollAnimatedSection animation="animate-fade-in-up">
                        <span className="editorial-label">Ethical Standard</span>
                        <h1 className="page-title">The Future.</h1>
                        <p className="page-subtitle">
                            Sourcing materials that respect the Earth and the craftsmanship behind them.
                        </p>
                        <div className="section-divider"></div>
                    </ScrollAnimatedSection>
                </div>
            </section>

            {/* Philosophy - Muted */}
            <section className="section section-muted sustainability-overview">
                <div className="container">
                    <div className="sus-hero-grid">
                        <ScrollAnimatedSection animation="animate-fade-in-left">
                            <div className="sus-text-block">
                                <h2>Regenerative Principles</h2>
                                <p>
                                    Sustainability is not an option—it is a core requirement of modern manufacturing.
                                    We operate with zero-compromise policies on ecological health and social equity.
                                </p>
                            </div>
                        </ScrollAnimatedSection>
                        <div className="sus-visual-block"></div>
                    </div>
                </div>
            </section>

            {/* Initiatives - Dark Boxed */}
            <section className="section section-dark initiatives-section">
                <div className="container">
                    <ScrollAnimatedSection animation="animate-fade-in-up">
                        <div className="editorial-header">
                            <h2 className="section-title">Critical Metrics</h2>
                            <div className="section-divider"></div>
                        </div>

                        <div className="initiatives-grid">
                            <div className="initiative-item">
                                <span className="sus-index">01</span>
                                <h3>GOTS Certified</h3>
                                <p>Using organic textile standards to ensure environmental and social responsibility.</p>
                            </div>
                            <div className="initiative-item">
                                <span className="sus-index">02</span>
                                <h3>Compliance Node</h3>
                                <p>Full adherence to SA8000, SEDEX, and BSCI social accountability protocols.</p>
                            </div>
                            <div className="initiative-item">
                                <span className="sus-index">03</span>
                                <h3>Export Ready</h3>
                                <p>Meeting Disney and major global retail facility standards for safe and ethical production.</p>
                            </div>
                        </div>
                    </ScrollAnimatedSection>
                </div>
            </section>

            {/* Labor - Light Grid */}
            <section className="section section-light social-responsibility">
                <div className="container">
                    <ScrollAnimatedSection animation="animate-fade-in-up">
                        <div className="social-header">
                            <h2 className="section-title">Our People</h2>
                            <p>Ensuring radical transparency and fair labor across every production floor.</p>
                        </div>

                        <div className="social-grid">
                            <div className="social-card">
                                <h4>Fair Wages</h4>
                                <p>Above-industry standard compensation and comprehensive healthcare benefits.</p>
                            </div>
                            <div className="social-card">
                                <h4>Skill Dev</h4>
                                <p>Continuous education programs for artisanal weaving and digital tailoring.</p>
                            </div>
                        </div>
                    </ScrollAnimatedSection>
                </div>
            </section>
        </div>
    );
}

export default Sustainability;
