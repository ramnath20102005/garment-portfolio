import { useState } from "react";
import "./page_css/Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        subject: "",
        message: ""
      });
    }, 3000);
  };

  return (
    <div className="contact">
      {/* Page Header */}
      <section className="contact-header">
        <div className="container">
          <h1 className="page-title">Contact Us</h1>
          <p className="page-subtitle">
            Get in touch with our team for inquiries, quotes, or partnership opportunities
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-section">
              <h2>Send Us a Message</h2>
              <p className="form-description">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>

              {submitted && (
                <div className="success-message">
                  ✓ Thank you! Your message has been sent successfully.
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="company">Company Name</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your Company"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="quote">Request a Quote</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="quality">Quality Concerns</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Tell us about your requirements..."
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-submit">
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="contact-info-section">
              <h2>Contact Information</h2>

              <div className="info-cards">
                <div className="info-card">
                  <div className="info-icon">📧</div>
                  <h4>Email Us</h4>
                  <p>info@premiumgarments.com</p>
                  <p>sales@premiumgarments.com</p>
                </div>

                <div className="info-card">
                  <div className="info-icon">📞</div>
                  <h4>Call Us</h4>
                  <p>+1 (555) 123-4567</p>
                  <p>+1 (555) 987-6543</p>
                </div>

                <div className="info-card">
                  <div className="info-icon">📍</div>
                  <h4>Visit Us</h4>
                  <p>123 Industrial Avenue</p>
                  <p>Manufacturing District</p>
                  <p>City, State 12345</p>
                </div>

                <div className="info-card">
                  <div className="info-icon">🕐</div>
                  <h4>Business Hours</h4>
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>

              <div className="social-links">
                <h4>Follow Us</h4>
                <div className="social-icons">
                  <a href="#linkedin" className="social-icon">LinkedIn</a>
                  <a href="#facebook" className="social-icon">Facebook</a>
                  <a href="#instagram" className="social-icon">Instagram</a>
                  <a href="#twitter" className="social-icon">Twitter</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="additional-info">
        <div className="container">
          <div className="info-grid">
            <div className="info-box">
              <h3>🌍 Global Reach</h3>
              <p>Serving clients in 40+ countries worldwide with reliable export services.</p>
            </div>
            <div className="info-box">
              <h3>⚡ Quick Response</h3>
              <p>Our team responds to all inquiries within 24 hours during business days.</p>
            </div>
            <div className="info-box">
              <h3>🤝 Partnership Ready</h3>
              <p>Open to long-term partnerships and custom manufacturing agreements.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
