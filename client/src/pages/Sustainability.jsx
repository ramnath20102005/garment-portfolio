import "./page_css/Sustainability.css";

function Sustainability() {
    return (
        <div className="sustainability">
            {/* Page Header */}
            <section className="sustainability-header">
                <div className="container">
                    <h1 className="page-title">Sustainability Commitment</h1>
                    <p className="page-subtitle">
                        Building a responsible future through eco-friendly manufacturing
                    </p>
                </div>
            </section>

            {/* Sustainability Overview */}
            <section className="sustainability-overview">
                <div className="container">
                    <div className="overview-content">
                        <h2>Our Environmental Responsibility</h2>
                        <p>
                            At Premium Garments, sustainability is not just a buzzword—it's a
                            core value that guides our operations. We are committed to minimizing
                            our environmental impact while maintaining the highest quality standards
                            in garment manufacturing.
                        </p>
                        <p>
                            From sourcing organic and recycled materials to implementing
                            energy-efficient processes and waste reduction programs, every decision
                            we make considers its environmental and social impact. Our goal is to
                            create fashion that doesn't cost the earth.
                        </p>
                    </div>
                </div>
            </section>

            {/* Key Initiatives */}
            <section className="initiatives-section">
                <div className="container">
                    <h2 className="section-title">Our Sustainability Initiatives</h2>
                    <p className="section-subtitle">
                        Concrete actions toward a greener future
                    </p>

                    <div className="initiatives-grid">
                        <div className="initiative-card">
                            <div className="initiative-icon">🌱</div>
                            <h3>Organic Materials</h3>
                            <p>
                                We prioritize GOTS-certified organic cotton and other sustainable
                                fabrics, reducing pesticide use and supporting eco-friendly farming.
                            </p>
                            <div className="initiative-stat">
                                <span className="stat-number">60%</span>
                                <span className="stat-text">Organic Materials Used</span>
                            </div>
                        </div>

                        <div className="initiative-card">
                            <div className="initiative-icon">💧</div>
                            <h3>Water Conservation</h3>
                            <p>
                                Advanced water recycling systems and low-water dyeing technologies
                                reduce our water consumption by up to 40%.
                            </p>
                            <div className="initiative-stat">
                                <span className="stat-number">40%</span>
                                <span className="stat-text">Water Reduction</span>
                            </div>
                        </div>

                        <div className="initiative-card">
                            <div className="initiative-icon">⚡</div>
                            <h3>Renewable Energy</h3>
                            <p>
                                Solar panels and energy-efficient machinery power our facilities,
                                significantly reducing our carbon footprint.
                            </p>
                            <div className="initiative-stat">
                                <span className="stat-number">50%</span>
                                <span className="stat-text">Renewable Energy</span>
                            </div>
                        </div>

                        <div className="initiative-card">
                            <div className="initiative-icon">♻️</div>
                            <h3>Waste Reduction</h3>
                            <p>
                                Comprehensive recycling programs and fabric waste minimization
                                through optimized cutting patterns and upcycling.
                            </p>
                            <div className="initiative-stat">
                                <span className="stat-number">85%</span>
                                <span className="stat-text">Waste Recycled</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Certifications */}
            <section className="sustainability-certifications">
                <div className="container">
                    <h2 className="section-title">Environmental Certifications</h2>
                    <div className="cert-grid">
                        <div className="cert-item">
                            <div className="cert-logo">🌿</div>
                            <h4>GOTS Certified</h4>
                            <p>Global Organic Textile Standard certification for organic fiber processing</p>
                        </div>
                        <div className="cert-item">
                            <div className="cert-logo">✓</div>
                            <h4>OEKO-TEX</h4>
                            <p>Certified safe textiles free from harmful substances</p>
                        </div>
                        <div className="cert-item">
                            <div className="cert-logo">🌍</div>
                            <h4>BCI Member</h4>
                            <p>Better Cotton Initiative promoting sustainable cotton farming</p>
                        </div>
                        <div className="cert-item">
                            <div className="cert-logo">🔄</div>
                            <h4>GRS Certified</h4>
                            <p>Global Recycled Standard for recycled content verification</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Responsibility */}
            <section className="social-responsibility">
                <div className="container">
                    <h2 className="section-title">Social Responsibility</h2>
                    <p className="section-subtitle">
                        Caring for our people and communities
                    </p>

                    <div className="social-grid">
                        <div className="social-card">
                            <h4>👥 Fair Labor Practices</h4>
                            <p>
                                WRAP certification ensures fair wages, safe working conditions,
                                and no child or forced labor in our facilities.
                            </p>
                        </div>

                        <div className="social-card">
                            <h4>📚 Employee Development</h4>
                            <p>
                                Continuous training programs, skill development workshops, and
                                career advancement opportunities for all employees.
                            </p>
                        </div>

                        <div className="social-card">
                            <h4>🏥 Health & Safety</h4>
                            <p>
                                Comprehensive health insurance, regular safety audits, and
                                wellness programs for employee well-being.
                            </p>
                        </div>

                        <div className="social-card">
                            <h4>🤝 Community Support</h4>
                            <p>
                                Local community initiatives including education support,
                                healthcare programs, and environmental awareness campaigns.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Future Goals */}
            <section className="future-goals">
                <div className="container">
                    <h2 className="section-title">2030 Sustainability Goals</h2>
                    <div className="goals-grid">
                        <div className="goal-item">
                            <div className="goal-icon">🎯</div>
                            <h4>Carbon Neutral</h4>
                            <p>Achieve carbon neutrality across all operations</p>
                        </div>
                        <div className="goal-item">
                            <div className="goal-icon">🌊</div>
                            <h4>Zero Waste Water</h4>
                            <p>100% water recycling and zero wastewater discharge</p>
                        </div>
                        <div className="goal-item">
                            <div className="goal-icon">📦</div>
                            <h4>Plastic-Free Packaging</h4>
                            <p>Eliminate all single-use plastics from packaging</p>
                        </div>
                        <div className="goal-item">
                            <div className="goal-icon">🌳</div>
                            <h4>100% Sustainable Materials</h4>
                            <p>Use only organic or recycled materials</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="sustainability-cta">
                <div className="container">
                    <h2>Partner for a Sustainable Future</h2>
                    <p>
                        Join us in creating fashion that respects both people and planet.
                        Let's build a sustainable supply chain together.
                    </p>
                    <a href="/contact" className="btn btn-primary">Learn More About Our Practices</a>
                </div>
            </section>
        </div>
    );
}

export default Sustainability;
