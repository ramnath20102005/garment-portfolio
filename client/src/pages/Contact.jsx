import { useState } from "react";
import "./page_css/Contact.css";
import ScrollAnimatedSection from "../components/ScrollAnimatedSection";

function Contact() {
  const [formData, setFormData] = useState({
    name: "", email: "", company: "", phone: "", subject: "", message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", company: "", phone: "", subject: "", message: "" });
    }, 3000);
  };

  return (
    <div className="contact">
      {/* Header */}
      <section className="section section-light contact-header">
        <div className="container">
          <ScrollAnimatedSection animation="animate-fade-in-up">
            <span className="editorial-label">Inquiry Desk</span>
            <h1 className="page-title">The Dialogue.</h1>
            <p className="page-subtitle">
              Initiate a strategic partnership or logistical inquiry regarding our capabilities.
            </p>
            <div className="section-divider"></div>
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* Contact Content - Muted Form */}
      <section className="section section-muted contact-content">
        <div className="container">
          <div className="contact-grid">
            <ScrollAnimatedSection animation="animate-fade-in-left">
              <div className="contact-form-portal">
                <h2>Portal / Log Inquiry</h2>
                <div className="section-divider"></div>

                {submitted && (
                  <div className="success-tagline">
                    ✓ Your inquiry has been documented. Return communication expected within 24hr.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="editorial-form">
                  <div className="form-row">
                    <div className="input-group">
                      <label>Identity</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Full Name" />
                    </div>
                    <div className="input-group">
                      <label>Electronic Mail</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="email@address.com" />
                    </div>
                  </div>
                  <div className="input-group">
                    <label>Inquiry Context</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} required rows="6" placeholder="Document your requirements here..."></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary btn-full">Submit Protocol</button>
                </form>
              </div>
            </ScrollAnimatedSection>

            <ScrollAnimatedSection animation="animate-fade-in-right">
              <div className="contact-details-editorial">
                <div className="detail-item">
                  <h4>The Factory</h4>
                  <p>VR FASHIONS, 85, 86, VIVEKANANDHA NAGAR,<br />KOVILVALI, DHARAPURAM ROAD,<br />TIRUPUR-641606</p>
                </div>
                <div className="detail-item">
                  <h4>Personnel</h4>
                  <p>Mohan Raj: +91 98947 61456</p>
                  <p>Email: vmr@vrfashions.in</p>
                </div>
                <div className="social-nexus">
                  <h4>Global Presence</h4>
                  <div className="nexus-links">
                    <span>USA</span>
                    <span>France</span>
                    <span>Germany</span>
                  </div>
                </div>
              </div>
            </ScrollAnimatedSection>
          </div>
        </div>
      </section>

      {/* Footer Info - Dark Section */}
      <section className="section section-dark contact-stats">
        <div className="container">
          <ScrollAnimatedSection animation="animate-scale-in">
            <div className="info-dual-grid">
              <div className="info-node">
                <h3>Availability</h3>
                <p>Operating 24/6 across global timezones to ensure seamless communication.</p>
              </div>
              <div className="info-node">
                <h3>Response Policy</h3>
                <p>Strict 24-hour turnaround for initial quote generation and planning.</p>
              </div>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>
    </div>
  );
}

export default Contact;
