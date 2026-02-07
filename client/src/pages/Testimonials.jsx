import "./page_css/Testimonials.css";
import ScrollAnimatedSection from "../components/ScrollAnimatedSection";

const Testimonials = () => {
    const milestones = [
        {
            year: "2016",
            title: "The Genesis",
            description: "Established in Kovilvali, Tirupur, with an initial setup of 40 specialized machines focused on premium banian cloth."
        },
        {
            year: "2018",
            title: "Global Pivot",
            description: "Transitioned to a 100% export-oriented model, formalizing major trade routes with partners in France and the USA."
        },
        {
            year: "2021",
            title: "Excellence Certified",
            description: "Achieved full compliance with SA8000, SEDEX, and Disney standards, reinforcing our position as a trusted global manufacturer."
        },
        {
            year: "2024",
            title: "Operational Scale",
            description: "Attained a consistent production capacity of 50,000 pieces monthly while integrating fourth-generation automation."
        },
        {
            year: "2026",
            title: "The Horizon",
            description: "Strategic expansion plan to reach 100 active machines, optimized for high-volume regenerative garment production."
        }
    ];

    const testimonials = [
        {
            role: "European Retail Partner",
            text: "The consistent quality of knitted apparel delivered to our French outlets sets a benchmark for reliability. Their focus on European retail standards is exceptional."
        },
        {
            role: "North American Sourcing Desk",
            text: "Working with VR Fashions has streamlined our global distribution. Their facility's compliance with Disney and retail protocols ensures seamless bulk clearing."
        },
        {
            role: "Compliance Auditor",
            text: "Few factories maintain such rigorous adherence to social accountability and ethical trade protocols. Their documentation protocols across all stages are impeccable."
        },
        {
            role: "Sustainable Fashion Collaborator",
            text: "Their commitment to GOTS organic standards and regenerative principles proves that high-volume manufacturing can indeed respect ecological health."
        }
    ];

    return (
        <div className="testimonials-page">
            {/* Hero Section */}
            <section className="section-light testimonials-hero">
                <div className="container">
                    <ScrollAnimatedSection animation="animate-fade-in-up">
                        <span className="editorial-label">Validation & Vision</span>
                        <h1 className="page-title">Trusted by Partners.<br />Proven by Progress.</h1>
                        <p className="page-subtitle">
                            A record of reliability built on three decades of industry expertise and global collaboration.
                        </p>
                        <div className="section-divider"></div>
                    </ScrollAnimatedSection>
                </div>
            </section>

            {/* Our Journey Section */}
            <section className="section-muted journey-section">
                <div className="container">
                    <ScrollAnimatedSection animation="animate-fade-in-up">
                        <div className="editorial-header centered">
                            <h2 className="section-title">Our Journey & Key Milestones</h2>
                            <div className="section-divider center"></div>
                        </div>
                        <div className="milestones-timeline">
                            {milestones.map((m, idx) => (
                                <div key={idx} className="milestone-node">
                                    <div className="milestone-year">{m.year}</div>
                                    <div className="milestone-content">
                                        <h3>{m.title}</h3>
                                        <p>{m.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollAnimatedSection>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="section-dark testimonials-grid-section">
                <div className="container">
                    <ScrollAnimatedSection animation="animate-fade-in-up">
                        <div className="editorial-header">
                            <h2 className="section-title">What Our Partners Say</h2>
                            <p>Direct feedback from our global sourcing and compliance network.</p>
                        </div>
                        <div className="testimonials-grid">
                            {testimonials.map((t, idx) => (
                                <div key={idx} className="testimonial-card">
                                    <div className="quote-icon">“</div>
                                    <p className="testimonial-text">{t.text}</p>
                                    <div className="testimonial-author">
                                        <div className="author-line"></div>
                                        <span className="author-role">{t.role}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollAnimatedSection>
                </div>
            </section>

            {/* Achievements Section */}
            <section className="section-light achievements-section">
                <div className="container">
                    <div className="achievements-layout">
                        <ScrollAnimatedSection animation="animate-fade-in-left">
                            <div className="achievements-text">
                                <h2 className="section-title">Achievements & Capabilities</h2>
                                <div className="section-divider"></div>
                                <ul className="capability-list">
                                    <li><strong>Product Mastery:</strong> Specialists in precision T-shirts, premium nightwear, and technical sweatshirts.</li>
                                    <li><strong>Global Logistics:</strong> Proven delivery pipelines to over 40 nations with real-time customs integration.</li>
                                    <li><strong>Compliance Depth:</strong> Full certification across SA8000, SEDEX, BSCI, GOTS, and Global Recycled Standards.</li>
                                    <li><strong>Engineering:</strong> Fourth-generation circular knitting automation for error-free fabric production.</li>
                                </ul>
                            </div>
                        </ScrollAnimatedSection>
                        <ScrollAnimatedSection animation="animate-fade-in-right">
                            <div className="trust-summary-box">
                                <h3>Why Global Buyers<br />Trust VR Fashions</h3>
                                <p>Derived from 25 years of technical leadership, our operational model prioritizes radical transparency and fair labor practices, ensuring every garment reflects the ethics of our partners.</p>
                                <div className="trust-badge">Documented Reliability</div>
                            </div>
                        </ScrollAnimatedSection>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Testimonials;
