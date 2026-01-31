const express = require("express");
const Company = require("../models/Company");
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const Submission = require("../models/Submission");
const Activity = require("../models/Activity");

const router = express.Router();

// GET company info (Public: Approved only)
router.get("/", async (req, res) => {
  try {
    const company = await Company.findOne({ submissionStatus: 'Approved' });
    res.json(company || {});
  } catch (error) {
    res.status(500).json({ message: "Error fetching company data" });
  }
});

// GET all versions for manager
router.get("/all", auth, role(['MANAGER', 'ADMIN']), async (req, res) => {
  try {
    const companies = await Company.find().sort({ createdAt: -1 });
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching company versions" });
  }
});

// POST/PUT company info (Manager/Admin)
router.post("/", auth, role(['MANAGER', 'ADMIN']), async (req, res) => {
  try {
    const { submit, ...formData } = req.body;

    // Create new version
    const company = new Company({
      ...formData,
      managerId: req.user.id,
      submissionStatus: submit ? 'PendingApproval' : 'Draft'
    });

    await company.save();

    if (submit) {
      const submission = new Submission({
        managerId: req.user.id,
        entityType: 'Company',
        entityId: company._id,
        dataSnapshot: company.toObject()
      });
      await submission.save();
    }

    const activity = new Activity({
      userId: req.user.id,
      action: submit ? 'Submitted' : 'Created',
      entityType: 'Company',
      entityId: company._id,
      details: `Company Profile: ${company.name}`
    });
    await activity.save();

    res.json(company);
  } catch (error) {
    res.status(500).json({ message: "Error saving company data" });
  }
});

module.exports = router;
