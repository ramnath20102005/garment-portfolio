import "./page_css/Facilities.css";

function Facilities() {
    return (
        <div className="facilities">
            {/* Page Header */}
            <section className="facilities-header">
                <div className="container">
                    <h1 className="page-title">Our Facilities</h1>
                    <p className="page-subtitle">
                        State-of-the-art manufacturing infrastructure designed for excellence
                    </p>
                </div>
            </section>

            {/* Facilities Overview */}
            <section className="facilities-overview">
                <div className="container">
                    <div className="overview-content">
                        <div className="overview-text">
                            <h2>World-Class Manufacturing Infrastructure</h2>
                            <p>
                                Our manufacturing facilities span over 200,000 square feet of modern
                                production space, equipped with the latest technology and machinery.
                                We maintain multiple production lines capable of handling diverse
                                garment categories with precision and efficiency.
                            </p>
                            <p>
                                Every facility is designed with sustainability in mind, featuring
                                energy-efficient systems, waste management protocols, and worker
                                safety as top priorities. Our commitment to excellence extends beyond
                                products to the environment we create for our team.
                            </p>
                        </div>
                        <div className="overview-stats">
                            <div className="facility-stat">
                                <span className="stat-icon">🏭</span>
                                <span className="stat-number">200K+</span>
                                <span className="stat-label">Sq. Ft. Production Space</span>
                            </div>
                            <div className="facility-stat">
                                <span className="stat-icon">⚙️</span>
                                <span className="stat-number">15+</span>
                                <span className="stat-label">Production Lines</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Features */}
            <section className="facility-features">
                <div className="container">
                    <h2 className="section-title">Facility Capabilities</h2>
                    <p className="section-subtitle">
                        Comprehensive manufacturing solutions under one roof
                    </p>

                    <div className="features-grid">
                        <div className="feature-box">
                            <div className="feature-icon">✂️</div>
                            <h3>Cutting Department</h3>
                            <p>
                                Advanced automated cutting machines with CAD/CAM integration
                                for precise fabric cutting and minimal waste.
                            </p>
                            <ul className="feature-list">
                                <li>Computer-aided design systems</li>
                                <li>Automated spreading machines</li>
                                <li>Laser cutting technology</li>
                            </ul>
                        </div>

                        <div className="feature-box">
                            <div className="feature-icon">🧵</div>
                            <h3>Sewing Department</h3>
                            <p>
                                Multiple production lines with specialized machines for different
                                garment types and stitching requirements.
                            </p>
                            <ul className="feature-list">
                                <li>500+ industrial sewing machines</li>
                                <li>Specialized equipment for details</li>
                                <li>Quality control at every station</li>
                            </ul>
                        </div>

                        <div className="feature-box">
                            <div className="feature-icon">🎨</div>
                            <h3>Finishing Department</h3>
                            <p>
                                Professional finishing services including pressing, packaging,
                                and quality inspection before shipment.
                            </p>
                            <ul className="feature-list">
                                <li>Steam pressing stations</li>
                                <li>Final quality inspection</li>
                                <li>Custom packaging solutions</li>
                            </ul>
                        </div>

                        <div className="feature-box">
                            <div className="feature-icon">🔬</div>
                            <h3>Quality Control Lab</h3>
                            <p>
                                In-house testing laboratory for fabric analysis, color matching,
                                and compliance verification.
                            </p>
                            <ul className="feature-list">
                                <li>Fabric testing equipment</li>
                                <li>Color matching systems</li>
                                <li>Compliance certification</li>
                            </ul>
                        </div>

                        <div className="feature-box">
                            <div className="feature-icon">📦</div>
                            <h3>Warehouse & Logistics</h3>
                            <p>
                                Climate-controlled storage facilities with advanced inventory
                                management and shipping coordination.
                            </p>
                            <ul className="feature-list">
                                <li>50,000 sq ft warehouse space</li>
                                <li>Inventory management systems</li>
                                <li>Direct shipping capabilities</li>
                            </ul>
                        </div>

                        <div className="feature-box">
                            <div className="feature-icon">💻</div>
                            <h3>Design Studio</h3>
                            <p>
                                Creative design team with digital design tools for custom
                                pattern development and sample creation.
                            </p>
                            <ul className="feature-list">
                                <li>Digital design software</li>
                                <li>Sample development room</li>
                                <li>Trend research capabilities</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technology & Innovation */}
            <section className="technology-section">
                <div className="container">
                    <h2 className="section-title">Technology & Innovation</h2>
                    <div className="tech-grid">
                        <div className="tech-card">
                            <h4>Automation</h4>
                            <p>
                                Automated cutting, spreading, and material handling systems
                                for increased efficiency and precision.
                            </p>
                        </div>
                        <div className="tech-card">
                            <h4>ERP Systems</h4>
                            <p>
                                Integrated enterprise resource planning for seamless production
                                tracking and inventory management.
                            </p>
                        </div>
                        <div className="tech-card">
                            <h4>Quality Monitoring</h4>
                            <p>
                                Real-time quality monitoring systems at every production stage
                                to ensure consistent excellence.
                            </p>
                        </div>
                        <div className="tech-card">
                            <h4>Energy Efficiency</h4>
                            <p>
                                Solar panels, LED lighting, and energy-efficient machinery
                                reducing our carbon footprint.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="facility-cta">
                <div className="container">
                    <h2>Want to Visit Our Facilities?</h2>
                    <p>
                        We welcome potential partners to tour our manufacturing facilities
                        and see our operations firsthand.
                    </p>
                    <a href="/contact" className="btn btn-primary">Schedule a Visit</a>
                </div>
            </section>
        </div>
    );
}

export default Facilities;
