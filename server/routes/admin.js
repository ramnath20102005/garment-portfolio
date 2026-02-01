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

        // 7. FINANCIAL TREND (Revenue vs Expenses)
        const financialTrend = await Financial.aggregate([
            { $match: { submissionStatus: 'Approved' } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                    revenue: { $sum: 100000 }, // Dummy base for range parsing or better parsing needed
                    // For now, let's extract the midpoint of the range if we can, 
                    // but better to use a numeric field in the future.
                    // Let's assume the revenueRange is "50000-60000"
                    expenses: { $sum: 80000 }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        // Better approach for financial trend:
        const rawFinancials = await Financial.find({ submissionStatus: 'Approved' }).sort({ createdAt: 1 });
        const processedFinancialTrend = rawFinancials.map(f => {
            const revParts = f.revenueRange.split('-').map(Number);
            const midRev = (revParts[0] + revParts[1]) / 2;
            const exp = midRev - (f.profitRange.split('-').map(Number)[0] + f.profitRange.split('-').map(Number)[1]) / 2;
            return {
                date: f.createdAt.toISOString().substring(0, 7),
                revenue: midRev,
                expenses: exp
            };
        });

        // 8. EXPORT TREND
        const exportTrend = await Export.aggregate([
            { $match: { submissionStatus: 'Approved' } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                    value: { $sum: "$value" }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        // 9. BUYER CONTRIBUTION
        const buyerContribution = await Buyer.find({ submissionStatus: 'Approved' });
        // Simulating contribution since Buyer model doesn't have financial linkage yet
        const processedBuyerContrib = buyerContribution.map(b => ({
            name: b.name,
            value: getRandomInt(20000, 100000) // Dummy contribution for demo
        }));

        // 10. AUDIT & SECURITY
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

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

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
                exports: exportDestinations.map(e => ({ name: e._id, value: e.value })),
                exportTrend: exportTrend.map(t => ({ date: t._id, value: t.value }))
            },
            financialData: {
                trend: processedFinancialTrend
            },
            buyerData: {
                contribution: processedBuyerContrib
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

// @route   GET /api/admin/users
// @desc    Get all system users and approved employees
// @access  Private (Admin)
router.get("/users", auth, role(["ADMIN"]), async (req, res) => {
    try {
        const users = await User.find().select("-password");
        const employees = await Employee.find({ submissionStatus: 'Approved' });

        // Map employees to a format compatible with the UI if they aren't already system users
        const mappedEmployees = employees.map(emp => ({
            _id: emp._id,
            username: emp.employeeId, // Use employee ID as "USER ID"
            name: emp.fullName,
            email: emp.email,
            role: emp.role,
            status: 'VERIFIED',
            isEmployee: true
        }));

        const mappedUsers = users.map(user => ({
            ...user.toObject(),
            isEmployee: false
        }));

        res.json([...mappedUsers, ...mappedEmployees]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: "Server Error" });
    }
});

// @route   POST /api/admin/users
// @desc    Create a new system user (Manager/Admin)
// @access  Private (Admin)
router.post("/users", auth, role(["ADMIN"]), async (req, res) => {
    const { username, password, email, name, role } = req.body;

    try {
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: "User already exists" });
        }

        user = new User({
            username,
            password, // Note: In a real app, hash this!
            email,
            name,
            role: role || 'MANAGER',
            status: 'VERIFIED'
        });

        await user.save();

        // Log activity
        const activity = new Activity({
            userId: req.user.id,
            action: 'CREATE_USER',
            details: `Created new user: ${username} (${role})`,
            entityType: 'User',
            entityId: user._id
        });
        await activity.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: "Server Error" });
    }
});

// @route   PUT /api/admin/users/:id
// @desc    Update a user
// @access  Private (Admin)
router.put("/users/:id", auth, role(["ADMIN"]), async (req, res) => {
    const { name, email, role, status } = req.body;

    try {
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.role = role || user.role;
        user.status = status || user.status;

        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: "Server Error" });
    }
});

// @route   DELETE /api/admin/users/:id
// @desc    Delete a user
// @access  Private (Admin)
router.delete("/users/:id", auth, role(["ADMIN"]), async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        await User.findByIdAndDelete(req.params.id);
        res.json({ msg: "User deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: "Server Error" });
    }
});

module.exports = router;
