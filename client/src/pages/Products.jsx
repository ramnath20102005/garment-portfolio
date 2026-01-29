import { useEffect, useState } from "react";
import "./page_css/Products.css";

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

  // Fallback products if database is empty
  const displayProducts = products.length > 0 ? products : [
    {
      _id: "1",
      name: "Premium Cotton T-Shirts",
      category: "Casual Wear",
      description: "High-quality 100% cotton t-shirts available in various colors and sizes. Perfect for everyday wear with superior comfort and durability."
    },
    {
      _id: "2",
      name: "Formal Dress Shirts",
      category: "Formal Wear",
      description: "Elegant dress shirts crafted from premium fabrics. Ideal for corporate and formal occasions with impeccable tailoring."
    },
    {
      _id: "3",
      name: "Denim Jeans",
      category: "Casual Wear",
      description: "Stylish and durable denim jeans with modern fits. Made from high-grade denim with excellent color retention."
    },
    {
      _id: "4",
      name: "Sports & Activewear",
      category: "Athletic",
      description: "Performance-focused athletic wear with moisture-wicking technology. Designed for comfort during intense physical activities."
    },
    {
      _id: "5",
      name: "Kids' Apparel",
      category: "Children",
      description: "Comfortable and safe clothing for children. Made with soft, skin-friendly fabrics and vibrant designs."
    },
    {
      _id: "6",
      name: "Women's Fashion",
      category: "Women's Wear",
      description: "Trendy and elegant women's clothing including dresses, tops, and more. Combining style with comfort."
    }
  ];

  return (
    <div className="products">
      {/* Page Header */}
      <section className="products-header">
        <div className="container">
          <h1 className="page-title">Our Products</h1>
          <p className="page-subtitle">
            Premium quality garments for every occasion and market segment
          </p>
        </div>
      </section>

      {/* Product Categories Overview */}
      <section className="categories-overview">
        <div className="container">
          <h2 className="section-title">Product Categories</h2>
          <div className="categories-grid">
            <div className="category-badge">Casual Wear</div>
            <div className="category-badge">Formal Wear</div>
            <div className="category-badge">Athletic Wear</div>
            <div className="category-badge">Children's Apparel</div>
            <div className="category-badge">Women's Fashion</div>
            <div className="category-badge">Custom Orders</div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="products-section">
        <div className="container">
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading products...</p>
            </div>
          ) : (
            <>
              <div className="products-grid">
                {displayProducts.map(product => (
                  <div key={product._id} className="product-card">
                    <div className="product-header">
                      <span className="product-category">{product.category}</span>
                    </div>
                    <div className="product-content">
                      <h3 className="product-name">{product.name}</h3>
                      <p className="product-description">{product.description}</p>
                    </div>
                    <div className="product-footer">
                      <button className="btn-inquiry">Request Quote</button>
                    </div>
                  </div>
                ))}
              </div>

              {displayProducts.length === 0 && !loading && (
                <div className="no-products">
                  <p>No products available at the moment.</p>
                  <p>Please contact us for custom manufacturing inquiries.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Custom Manufacturing CTA */}
      <section className="custom-manufacturing">
        <div className="container">
          <h2>Need Custom Manufacturing?</h2>
          <p>
            We specialize in custom garment manufacturing tailored to your specific
            requirements. From design to delivery, we handle it all.
          </p>
          <div className="custom-features">
            <div className="custom-feature">
              <span className="feature-check">✓</span>
              <span>Custom Designs & Patterns</span>
            </div>
            <div className="custom-feature">
              <span className="feature-check">✓</span>
              <span>Flexible Order Quantities</span>
            </div>
            <div className="custom-feature">
              <span className="feature-check">✓</span>
              <span>Private Labeling Available</span>
            </div>
            <div className="custom-feature">
              <span className="feature-check">✓</span>
              <span>Quality Assurance Guaranteed</span>
            </div>
          </div>
          <a href="/contact" className="btn btn-primary">Contact Us for Custom Orders</a>
        </div>
      </section>
    </div>
  );
}

export default Products;
