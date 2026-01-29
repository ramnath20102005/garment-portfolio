const express = require("express");
const Company = require("../models/Company");

const router = express.Router();

// GET company info
router.get("/", async (req, res) => {
  try {
    const company = await Company.findOne();
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: "Error fetching company data" });
  }
});

// POST company info (temporary – for setup)
router.post("/", async (req, res) => {
  try {
    const company = new Company(req.body);
    await company.save();
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: "Error saving company data" });
  }
});

module.exports = router;
