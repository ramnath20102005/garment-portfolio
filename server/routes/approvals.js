const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const Submission = require("../models/Submission");
const Approval = require("../models/Approval");
const Employee = require("../models/Employee");
const Project = require("../models/Project");
const OperationalReport = require("../models/OperationalReport");
const Export = require("../models/Export");
const RawMaterial = require("../models/RawMaterial");
const Workforce = require("../models/Workforce");
const Buyer = require("../models/Buyer");
const Financial = require("../models/Financial");
const Media = require("../models/Media");
const Update = require("../models/Update");
const Company = require("../models/Company");
const Activity = require("../models/Activity");

// @route   GET /api/approvals
// @desc    Get all pending submissions for admin
// @access  Private (Admin)
router.get("/", auth, role(["ADMIN"]), async (req, res) => {
    try {
        const submissions = await Submission.find({ status: "Pending" })
            .populate("managerId", "username")
            .sort({ submittedAt: -1 });
        res.json(submissions);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: "Server Error" });
    }
});

// @route   POST /api/approvals/:id
// @desc    Approve or Reject a submission
// @access  Private (Admin)
router.post("/:id", auth, role(["ADMIN"]), async (req, res) => {
    try {
        const { action, comments } = req.body; // action: 'Approved' or 'Rejected'
        const submission = await Submission.findById(req.params.id);
        if (!submission) return res.status(404).json({ msg: "Submission not found" });

        // Update Submission status
        submission.status = action;
        await submission.save();

        // Create Approval record
        const approval = new Approval({
            submissionId: submission._id,
            adminId: req.user.id,
            action,
            comments
        });
        await approval.save();

        // Update actual entity
        const Model = {
            'Employee': Employee,
            'Project': Project,
            'OperationalReport': OperationalReport,
            'Export': Export,
            'RawMaterial': RawMaterial,
            'Workforce': Workforce,
            'Buyer': Buyer,
            'Financial': Financial,
            'Media': Media,
            'Update': Update,
            'Company': Company
        }[submission.entityType];

        if (Model) {
            const entityStatus = action === 'Approved' ? 'Approved' : 'Rejected';
            await Model.findByIdAndUpdate(submission.entityId, {
                $set: {
                    submissionStatus: entityStatus,
                    verificationMetadata: {
                        verifiedBy: req.user.id,
                        verifiedAt: Date.now(),
                        rejectionReason: action === 'Rejected' ? comments : ""
                    }
                }
            });
        }

        const activity = new Activity({
            userId: req.user.id,
            action,
            entityType: submission.entityType,
            entityId: submission.entityId,
            details: `Admin decision on ${submission.entityType}`
        });
        await activity.save();

        res.json({ msg: `Submission ${action}` });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: "Server Error" });
    }
});

module.exports = router;
