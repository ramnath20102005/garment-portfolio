import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Facilities from "./pages/Facilities";
import Exports from "./pages/Exports";
import Sustainability from "./pages/Sustainability";
import Contact from "./pages/Contact";

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/exports" element={<Exports />} />
        <Route path="/sustainability" element={<Sustainability />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;