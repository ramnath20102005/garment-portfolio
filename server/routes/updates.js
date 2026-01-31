const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const Update = require("../models/Update");
const Submission = require("../models/Submission");
const Activity = require("../models/Activity");

// @route   GET api/updates
// @desc    Get approved updates
// @access  Public
router.get("/", async (req, res) => {
    try {
        const updates = await Update.find({ submissionStatus: 'Approved' }).sort({ date: -1 });
        res.json(updates);
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

// @route   GET api/updates/all
// @desc    Get all updates for managers
// @access  Private
router.get("/all", auth, role(['MANAGER', 'ADMIN']), async (req, res) => {
    try {
        const updates = await Update.find().sort({ date: -1 });
        res.json(updates);
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

// @route   POST api/updates
// @desc    Create new update
router.post("/", auth, role(['MANAGER', 'ADMIN']), async (req, res) => {
    try {
        const { title, content, category, date, submit } = req.body;
        const newUpdate = new Update({
            title, content, category, date,
            managerId: req.user.id,
            submissionStatus: submit ? 'PendingApproval' : 'Draft'
        });

        const savedUpdate = await newUpdate.save();

        if (submit) {
            const submission = new Submission({
                managerId: req.user.id,
                entityType: 'Update',
                entityId: savedUpdate._id,
                dataSnapshot: savedUpdate.toObject()
            });
            await submission.save();
        }

        const activity = new Activity({
            userId: req.user.id,
            action: submit ? 'Submitted' : 'Created',
            entityType: 'Update',
            entityId: savedUpdate._id,
            details: `Update: ${title}`
        });
        await activity.save();

        res.json(savedUpdate);
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;
