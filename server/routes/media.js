const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const Media = require("../models/Media");
const Submission = require("../models/Submission");
const Activity = require("../models/Activity");

// @route   GET api/media
// @desc    Get approved media
// @access  Public
router.get("/", async (req, res) => {
    try {
        const media = await Media.find({ submissionStatus: 'Approved' }).sort({ createdAt: -1 });
        res.json(media);
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

// @route   GET api/media/all
// @desc    Get all media for managers
// @access  Private
router.get("/all", auth, role(['MANAGER', 'ADMIN']), async (req, res) => {
    try {
        const media = await Media.find().sort({ createdAt: -1 });
        res.json(media);
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

// @route   POST api/media
// @desc    Upload/Add media
router.post("/", auth, role(['MANAGER', 'ADMIN']), async (req, res) => {
    try {
        const { title, url, type, category, submit } = req.body;
        const newMedia = new Media({
            title, url, type, category,
            managerId: req.user.id,
            submissionStatus: submit ? 'PendingApproval' : 'Draft'
        });

        const savedMedia = await newMedia.save();

        if (submit) {
            const submission = new Submission({
                managerId: req.user.id,
                entityType: 'Media',
                entityId: savedMedia._id,
                dataSnapshot: savedMedia.toObject()
            });
            await submission.save();
        }

        const activity = new Activity({
            userId: req.user.id,
            action: submit ? 'Submitted' : 'Created',
            entityType: 'Media',
            entityId: savedMedia._id,
            details: `Asset: ${title}`
        });
        await activity.save();

        res.json(savedMedia);
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;
