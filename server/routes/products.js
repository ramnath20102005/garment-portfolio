const express = require("express");
const Product = require("../models/Product");
const Submission = require("../models/Submission");
const Activity = require("../models/Activity");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

const router = express.Router();

// Debugging for production logs
console.log("Loading Inventory Control Module: /api/products");

// @route   GET /api/products
// @desc    Get approved products for public portfolio
// @access  Public
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({ submissionStatus: 'Approved' }).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error("Fetch Approved Inventory Failure:", error.message);
    res.status(500).json({ error: "System failed to retrieve the public product catalogue." });
  }
});

// @route   GET /api/products/all
// @desc    Get all products for managers/admins
// @access  Private
router.get("/all", auth, role(['MANAGER', 'ADMIN']), async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error("Fetch Internal Registry Failure:", error.message);
    res.status(500).json({ error: "Management Intel failed to aggregate full inventory dataset." });
  }
});

// @route   GET /api/products/:id
// @desc    Get single product details
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Specified node not found in product registry." });
    }
    res.json(product);
  } catch (error) {
    console.error("Individual Node Fetch Error:", error.message);
    res.status(500).json({ error: "System reported a retrieval fault for this specific unit." });
  }
});

// @route   POST /api/products
// @desc    Add a product (Manager/Admin)
// @access  Private
router.post("/", auth, role(["MANAGER", "ADMIN"]), async (req, res) => {
  try {
    const { name, category, description, image, submit } = req.body;
    
    // If admin, default to Approved. If manager, default based on submit flag.
    const status = req.user.role === 'ADMIN' ? 'Approved' : (submit ? 'PendingApproval' : 'Draft');

    const product = new Product({
      name, category, description, image,
      managerId: req.user.id,
      submissionStatus: status
    });

    await product.save();

    if (status === 'PendingApproval') {
      const submission = new Submission({
        managerId: req.user.id,
        entityType: 'Product',
        entityId: product._id,
        dataSnapshot: product.toObject()
      });
      await submission.save();
    }

    const activity = new Activity({
      userId: req.user.id,
      action: status === 'PendingApproval' ? 'Submitted' : (status === 'Approved' ? 'Created' : 'Drafted'),
      entityType: 'Product',
      entityId: product._id,
      details: `Product Node: ${name} Initialized`
    });
    await activity.save();

    res.status(201).json({ 
      msg: "Product entry successfully synchronized.", 
      id: product._id,
      status: product.submissionStatus 
    });
  } catch (error) {
    console.error("Inventory Entry Failure:", error.message);
    res.status(500).json({ error: "Registry addition protocols encountered a storage block." });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete a product (Protected: Admin)
// @access  Private (Admin)
router.delete("/:id", auth, role(["ADMIN"]), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "No matching record for purging." });

    await Product.findByIdAndDelete(req.params.id);

    const activity = new Activity({
      userId: req.user.id,
      action: 'Deleted',
      entityType: 'Product',
      entityId: product._id,
      details: `Product Purge: ${product.name}`
    });
    await activity.save();

    res.json({ msg: "Record successfully de-indexed and purged from portfolio." });
  } catch (err) {
    console.error("Purge Protocol Error:", err.message);
    res.status(500).json({ error: "Critical failure during record de-indexing." });
  }
});

module.exports = router;