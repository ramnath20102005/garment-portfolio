const express = require("express");
const Product = require("../models/Product");

const auth = require("../middleware/auth");
const role = require("../middleware/role");

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

// POST product (Protected: Manager & Admin)
router.post("/", auth, role(["MANAGER", "ADMIN"]), async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error saving product" });
  }
});

module.exports = router;