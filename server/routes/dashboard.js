const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Activity = require("../models/Activity");
const Employee = require("../models/Employee");
const Project = require("../models/Project");

// @route   GET api/dashboard/activity
// @desc    Get recent activity for logged-in user
// @access  Private
router.get("/activity", auth, async (req, res) => {
    try {
        const activity = await Activity.find({ userId: req.user.id })
            .sort({ createdAt: -1 })
            .limit(10);
        res.json(activity);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
});

// @route   GET api/dashboard/stats
// @desc    Get manager stats
// @access  Private
router.get("/stats", auth, async (req, res) => {
    try {
        const userId = req.user.id;
        const employees = await Employee.countDocuments({ managerId: userId });
        const activeProjects = await Project.countDocuments({
            managerId: userId,
            submissionStatus: 'Approved',
            status: { $ne: 'Completed' }
        });
        const pendingSubmissions = await Activity.countDocuments({
            userId,
            action: 'Submitted'
        });

        res.json({
            employees,
            projects: activeProjects,
            pending: pendingSubmissions
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;
