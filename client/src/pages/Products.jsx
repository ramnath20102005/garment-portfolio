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

  const defaultProducts = [
    { name: "Boys T-Shirt", image: "/boys-t-shirt.jpg" },
    { name: "Boys Hooded Sweat Shirt", image: "/boys_hood.jpeg" },
    { name: "Boys Sweatshirt", image: "/boys_hood.jpeg" },
    { name: "Girls Pyjama Sets", image: "/girls_pyjamas1.jpg.jpeg" },
    { name: "Ladies Long Dress", image: "/long_sleeve1.jpg.jpeg" },
    { name: "Adult Brown Moose Series", image: "/brown_moos.jpeg" },
    { name: "Womens PJ Set", image: "/women_pj_set.jpg" }
  ];

  const displayProducts = products.length > 0
    ? products.map(p => {
      if (!p.image) {
        const match = defaultProducts.find(dp =>
          p.name.toLowerCase().includes(dp.name.toLowerCase()) ||
          dp.name.toLowerCase().includes(p.name.toLowerCase())
        );
        return { ...p, image: match ? match.image : "/vr.jpeg" };
      }
      return p;
    })
    : [
      { _id: "1", name: "Boys T-Shirt", category: "Kids", description: "High-quality knitted t-shirts, custom designed to buyer specifications.", image: "/boys-t-shirt.jpg" },
      { _id: "2", name: "Boys Hooded Sweat Shirt", category: "Outerwear", description: "Premium cotton-blend hoodies with durable stitching and soft finish.", image: "/boys_hood.jpeg" },
      { _id: "3", name: "Girls Pyjama Sets", category: "Sleepwear", description: "Breathable and comfortable sleep sets designed for youthful elegance.", image: "/girls_pyjamas1.jpg.jpeg" },
      { _id: "4", name: "Ladies Long Dress", category: "Womenswear", description: "Fashion-forward long dresses crafted from the finest knitted cotton.", image: "/long_sleeve1.jpg.jpeg" },
      { _id: "5", name: "Adult Brown Moose Series", category: "Specialty", description: "Our exclusive specialty series designed for international merchandise.", image: "/brown_moos.jpeg" },
      { _id: "6", name: "Womens PJ Set", category: "Sleepwear", description: "Luxury loungewear sets combining style with ultimate overnight comfort.", image: "/women_pj_set.jpg" }
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
                    <div className="product-visual">
                      <img src={product.image} alt={product.name} />
                    </div>
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
