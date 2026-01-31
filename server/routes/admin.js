const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const Employee = require("../models/Employee");
const Project = require("../models/Project");
const Submission = require("../models/Submission");
const User = require("../models/User");
const Activity = require("../models/Activity");
const Export = require("../models/Export");
const RawMaterial = require("../models/RawMaterial");
const Financial = require("../models/Financial");
const Buyer = require("../models/Buyer");
const OperationalReport = require("../models/OperationalReport");
const Workforce = require("../models/Workforce");
const mongoose = require("mongoose");

// @route   GET /api/admin/stats
// @desc    Get aggregated stats for admin dashboard
// @access  Private (Admin)
router.get("/stats", auth, role(["ADMIN"]), async (req, res) => {
    try {
        const UserModel = mongoose.model("User");

        // 1. TOP SUMMARY KPIs
        const totalEmployees = await Employee.countDocuments({ submissionStatus: 'Approved' });
        const activeProjects = await Project.countDocuments({ submissionStatus: 'Approved', status: 'In Progress' });
        const pendingVerifications = await Submission.countDocuments({ status: "Pending" });
        const totalManagers = await UserModel.countDocuments({ role: 'MANAGER' });

        const exportAggr = await Export.aggregate([
            { $match: { submissionStatus: 'Approved' } },
            { $group: { _id: null, total: { $sum: "$value" } } }
        ]);
        const totalExportsValue = exportAggr.length > 0 ? exportAggr[0].total : 0;

        // 2. APPROVAL & GOVERNANCE
        const submissionStatusDist = await Submission.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);

        const approvalsByEntity = await Submission.aggregate([
            { $match: { status: 'Approved' } },
            { $group: { _id: "$entityType", count: { $sum: 1 } } }
        ]);

        // 3. WORKFORCE & HR ANALYTICS
        const deptStats = await Employee.aggregate([
            { $match: { submissionStatus: 'Approved' } },
            { $group: { _id: "$department", count: { $sum: 1 } } }
        ]);

        const workforceTrend = await Employee.aggregate([
            { $match: { submissionStatus: 'Approved' } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        // 4. PROJECT & OPERATIONS
        const projectStatusDist = await Project.aggregate([
            { $match: { submissionStatus: 'Approved' } },
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);

        // 5. SUPPLY CHAIN & EXPORTS
        const materialStock = await RawMaterial.aggregate([
            { $match: { submissionStatus: 'Approved' } },
            { $group: { _id: "$materialType", quantity: { $sum: "$quantity" } } }
        ]);

        const exportDestinations = await Export.aggregate([
            { $match: { submissionStatus: 'Approved' } },
            { $group: { _id: "$region", value: { $sum: "$value" } } }
        ]);

        // 6. BUYER ANALYSIS
        const buyerStatusDist = await Buyer.aggregate([
            { $match: { submissionStatus: 'Approved' } },
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);

        // 7. FINANCIAL OVERVIEW 
        // Note: Using ranges for visualization (simplified)
        const financialRecords = await Financial.find({ submissionStatus: 'Approved' }).limit(5);

        // 8. AUDIT & SECURITY
        const activityHeatmap = await Activity.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { "_id": -1 } },
            { $limit: 30 }
        ]);

        const recentActivity = await Activity.find()
            .populate('userId', 'username')
            .sort({ createdAt: -1 })
            .limit(10);

        res.json({
            kpis: {
                totalEmployees,
                activeProjects,
                totalManagers,
                pendingVerifications,
                totalExportsValue,
                accuracyRate: "98.5%"
            },
            approvalData: {
                statusDist: submissionStatusDist.map(s => ({ name: s._id, value: s.count })),
                entityDist: approvalsByEntity.map(a => ({ name: a._id, value: a.count }))
            },
            workforceData: {
                deptDist: deptStats.map(d => ({ name: d._id, value: d.count })),
                trend: workforceTrend.map(t => ({ date: t._id, count: t.count }))
            },
            projectData: {
                statusDist: projectStatusDist.map(p => ({ name: p._id, value: p.count }))
            },
            supplyChainData: {
                stock: materialStock.map(m => ({ name: m._id, quantity: m.quantity })),
                exports: exportDestinations.map(e => ({ name: e._id, value: e.value }))
            },
            buyerData: {
                statusDist: buyerStatusDist.map(b => ({ name: b._id, value: b.count }))
            },
            auditData: {
                heatmap: activityHeatmap.map(h => ({ date: h._id, count: h.count })),
                recent: recentActivity
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: "Server Error" });
    }
});

module.exports = router;
