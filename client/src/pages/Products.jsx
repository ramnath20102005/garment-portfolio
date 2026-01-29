import { useEffect, useState } from "react";
import "./page_css/Products.css";
import ScrollAnimatedSection from "../components/ScrollAnimatedSection";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  const displayProducts = products.length > 0 ? products : [
    { _id: "1", name: "Artisanal Cotton Series", category: "Knitwear", description: "High-density 100% cotton garments with proprietary pre-wash finishing." },
    { _id: "2", name: "Corporate Structured Shirts", category: "Formal", description: "Impeccable tailoring meets breathable premium textiles for the modern workspace." },
    { _id: "3", name: "Resilient Denim Workwear", category: "Denim", description: "Traditional heavy-duty denim reimagined with modern ergonomic fits." },
    { _id: "4", name: "Technical Active Series", category: "Performance", description: "Precision-engineered apparel for high-impact physical performance." },
    { _id: "5", name: "Soft-Touch Childrenswear", category: "Kids", description: "Hypoallergenic fabrics designed for ultimate comfort and durability." },
    { _id: "6", name: "Conceptual Womenswear", category: "Fashion", description: "Limited edition silhouettes blending architectural design with wearable grace." }
  ];

  return (
    <div className="products">
      {/* Header Section */}
      <section className="section section-light products-header">
        <div className="container">
          <ScrollAnimatedSection animation="animate-fade-in-up">
            <span className="editorial-label">Catalogue 2026</span>
            <h1 className="page-title">The Collection.</h1>
            <p className="page-subtitle">
              A curated selection of garment architectures across six specialized categories.
            </p>
            <div className="section-divider"></div>
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* Grid Container */}
      <section className="section section-muted products-section">
        <div className="container">
          {loading ? (
            <div className="loading"><div className="spinner"></div></div>
          ) : (
            <div className="products-grid">
              {displayProducts.map((product, idx) => (
                <ScrollAnimatedSection key={product._id} animation="animate-fade-in-up" delay={idx % 3 + 1}>
                  <div className="product-card">
                    <div className="product-visual"></div>
                    <div className="product-info">
                      <span className="product-category">{product.category}</span>
                      <h3 className="product-name">{product.name}</h3>
                      <p className="product-description">{product.description}</p>
                      <button className="btn-editorial">Request Details</button>
                    </div>
                  </div>
                </ScrollAnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bespoke Section */}
      <section className="section section-dark bespoke-cta">
        <div className="container">
          <ScrollAnimatedSection animation="animate-scale-in">
            <div className="bespoke-grid">
              <div className="bespoke-text">
                <h2 className="section-title">Bespoke Production</h2>
                <p>Custom manufacturing tailored to precise brand specifications—from initial sketch to global distribution.</p>
                <a href="/contact" className="btn btn-secondary" style={{ borderColor: 'var(--bg-light)', color: 'var(--bg-light)' }}>Initiate Protocol</a>
              </div>
              <div className="bespoke-visual">
                <div className="line-art"></div>
              </div>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>
    </div>
  );
}

export default Products;
