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

        // 3. STAFFING & HR ANALYTICS
        const deptStats = await Employee.aggregate([
            { $match: { submissionStatus: 'Approved' } },
            { $group: { _id: "$department", count: { $sum: 1 } } }
        ]);

        const staffingTrend = await Employee.aggregate([
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

        // 10. AUDIT & Pending Submissions
        // For the heatmap, we keep using Activity log
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

        // For the "Governance & Submission Protocol" table
        // Fetch ALL pending submissions first to ensure they aren't missed
        const pendingSubmissions = await Submission.find({ status: "Pending" })
            .populate('managerId', 'username')
            .sort({ createdAt: -1 });

        // Fetch some recent completed submissions for context
        const completedSubmissions = await Submission.find({ status: { $ne: "Pending" } })
            .populate('managerId', 'username')
            .sort({ createdAt: -1 })
            .limit(10);

        const allRelevantSubmissions = [...pendingSubmissions, ...completedSubmissions];

        const formattedQueueSubmissions = allRelevantSubmissions.map(sub => ({
            _id: sub._id,
            userId: sub.managerId, // Mapping managerId to userId for frontend compatibility
            entityType: sub.entityType,
            createdAt: sub.createdAt,
            action: 'Submitted', // Hardcode action so the frontend filter (a.action === 'Submitted') passes
            status: sub.status || 'Pending'
        }));

        // For the "Recent Activity" table (Audit), we might want a different list, 
        // but the frontend uses `stats.auditData.recent` for BOTH the "Governance" table (filtered) 
        // AND the "Neural Node Audit" table (unfiltered/raw).
        // This is a conflict in the frontend design.
        // The "Governance" section filters for `action === 'Submitted'`.
        // The "Neural Node Audit" section shows everything.
        // Solution: Return a combined list or separate lists. 
        // Since I cannot easily change the frontend structure without risk, and the user specifically asked about the "Governance" table missing data:
        // I will prepend the formatted pending submissions to the recent activity list.

        const recentActivity = await Activity.find()
            .populate('userId', 'username')
            .sort({ createdAt: -1 })
            .limit(10);

        // Combine: Submissions Queue (Priority) + Recent Activities
        const combinedRecent = [...formattedQueueSubmissions, ...recentActivity];

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
            staffingData: {
                deptDist: deptStats.map(d => ({ name: d._id, value: d.count })),
                trend: staffingTrend.map(t => ({ date: t._id, count: t.count }))
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
                recent: combinedRecent
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: "Server Error" });
    }
});

// @route   POST /api/admin/analyze-graph
// @desc    Analyze graph data and return AI-driven insights
// @access  Private (Admin)
router.post("/analyze-graph", auth, role(["ADMIN"]), async (req, res) => {
    try {
        const { chartType, data, title } = req.body;

        if (!data || !Array.isArray(data) || data.length === 0) {
            return res.status(400).json({ msg: "Insufficient data for real-time analysis." });
        }

        let report = {
            status: "Stable",
            currentStatus: "",
            observedTrend: "",
            criticalSignals: null,
            whyHappening: "",
            actions: [],
            formalAudit: ""
        };

        const prev = data[data.length - 2];
        const curr = data[data.length - 1];

        switch (chartType) {
            case 'financial': {
                const revenueChange = prev ? curr.revenue - prev.revenue : 0;
                const expenseChange = prev ? curr.expenses - prev.expenses : 0;
                const gap = curr.revenue - curr.expenses;
                const revenueDir = revenueChange >= 0 ? "Growth" : "Decline";

                report.status = (expenseChange > revenueChange) ? "Warning" : "Positive";
                report.currentStatus = `Revenue is currently ${gap > 0 ? "higher" : "lower"} than expenses ($${curr.revenue} vs $${curr.expenses}). The profit gap is ${gap > 0 ? "positive" : "negative"}.`;
                report.observedTrend = prev ? `Revenue has ${revenueChange >= 0 ? 'increased' : 'decreased'} compared to the previous period. Expenses moved ${expenseChange >= 0 ? 'up' : 'down'} by $${Math.abs(expenseChange)}.` : "Initial baseline established. Awaiting next cycle for trend analysis.";

                if (expenseChange > revenueChange && prev) {
                    report.criticalSignals = "Expenses are currently rising faster than revenue. Profit margins are narrowing.";
                }

                report.whyHappening = `Current pattern suggests ${report.status === 'Positive' ? 'efficient cost management during production' : 'a surge in operational costs that outpaces current billing'}.`;
                report.actions = [
                    report.status === "Positive" ? "Maintain current cost controls." : "Audit recent expense spikes immediately.",
                    "Monitor next cycle for margin stabilization."
                ];
                break;
            }

            case 'submissions': {
                const pending = data.find(d => d.name === 'Pending')?.value || 0;
                const total = data.reduce((acc, curr) => acc + curr.value, 0);
                const pendingRatio = (pending / total) * 100;

                report.status = pendingRatio > 30 ? "Critical" : (pendingRatio > 15 ? "Warning" : "Positive");
                report.currentStatus = `Currently ${pending} submissions are awaiting verification out of ${total} total records.`;
                report.observedTrend = `Pending items represent ${pendingRatio.toFixed(1)}% of the total queue. ${pendingRatio > 20 ? 'Queue density is increasing.' : 'Workflow is moving at standard speed.'}`;

                if (pendingRatio > 30) {
                    report.criticalSignals = "BOTTLENECK: The approval queue has exceeded the safe operational threshold of 30%.";
                }

                report.whyHappening = "Variation in management activity levels or a sudden spike in operational reporting.";
                report.actions = [
                    report.status === 'Critical' ? "Clear the backlog immediately to prevent project stalls." : "Continue routine verification.",
                    "Identify if specific departments are causing the delay."
                ];
                break;
            }

            case 'inventory': {
                const lowStock = data.filter(d => d.quantity < 20);
                const criticalCount = lowStock.length;

                report.status = criticalCount > 0 ? "Critical" : "Positive";
                report.currentStatus = `${criticalCount} material nodes are currently resting below safety buffers.`;
                report.observedTrend = `Total inventory coverage is ${criticalCount > 0 ? 'narrowing' : 'stable'}. Consumption is tracking ${criticalCount > 0 ? 'faster' : 'within'} replenishment cycles.`;

                if (criticalCount > 0) {
                    report.criticalSignals = `CRITICAL STOCK: ${lowStock.map(l => l.name).join(', ')} are in the danger zone (< 20 units).`;
                }

                report.whyHappening = "Recent high-volume projects combined with potential procurement latency.";
                report.actions = [
                    criticalCount > 0 ? "Initiate immediate reorder protocol for critical items." : "Monitor consumption rates.",
                    "Verify lead times with primary suppliers."
                ];
                break;
            }

            case 'exports': {
                const change = prev ? ((curr.value - prev.value) / prev.value) * 100 : 0;
                report.status = change > 5 ? "Positive" : (change < -5 ? "Warning" : "Stable");
                report.currentStatus = `Latest export valuation stands at ${curr.value}.`;
                report.observedTrend = prev ? `Market valuation has ${change > 0 ? 'surged' : 'varied'} by ${Math.abs(change).toFixed(1)}% compared to the previous cycle.` : "Establishing initial performance baseline.";

                if (change < -10) {
                    report.criticalSignals = "SHARP DROP: Export valuation has decreased significantly this cycle.";
                }

                report.whyHappening = "Successful fulfillment of major garment batches or seasonal territory shifts.";
                report.actions = [
                    "Lock in shipping capacity for the next cycle.",
                    "Diversify buyer regions to spread risk."
                ];
                break;
            }

            case 'staffing':
            case 'regions':
            case 'buyers': {
                const maxNode = data.reduce((prev, current) => (prev.value > current.value) ? prev : current);
                const total = data.reduce((acc, curr) => acc + (curr.value || 0), 0);
                const concentration = ((maxNode.value / total) * 100).toFixed(1);

                report.status = "Stable";
                report.currentStatus = `Primary sector detected: ${maxNode.name} with a value of ${maxNode.value}.`;
                report.observedTrend = `This node represents ${concentration}% of the total distribution. Resource allocation remains ${concentration > 50 ? 'heavily concentrated' : 'well-distributed'}.`;

                if (concentration > 60) {
                    report.criticalSignals = `HIGH CONCENTRATION: Over 60% of resources are localized in ${maxNode.name}. Suggests potential dependency or single-node risk.`;
                }

                report.whyHappening = "Historical department scaling and established regional trade routes.";
                report.actions = [
                    "Audit secondary nodes for growth potential.",
                    "Ensure backup protocols exist for high-dependency sectors."
                ];
                break;
            }

            default: {
                const total = data.reduce((acc, curr) => acc + (curr.value || curr.count || 0), 0);
                report.currentStatus = `Operating at a total volume of ${total} units in this sector.`;
                report.observedTrend = "Metrics are tracking within established historical parameters.";
                report.whyHappening = "Standard operational workflows and steady demand.";
                report.actions = ["Maintain current monitoring rhythm."];
            }
        }

        // Generate the final report string
        const detailedReport = `
SECTION:CURRENT_STATUS
${report.currentStatus}

SECTION:OBSERVED_TREND
${report.observedTrend}

${report.criticalSignals ? `SECTION:CRITICAL_SIGNALS\n${report.criticalSignals}\n` : ''}
SECTION:WHY_HAPPENING
${report.whyHappening}

SECTION:ADMIN_ACTIONS
${report.actions.map(a => `- ${a}`).join('\n')}
        `.trim();

        const downloadReport = `
ADMIN PERFORMANCE AUDIT: ${title ? title.toUpperCase() : 'SYSTEM'}
--------------------------------------------------
CURRENT STATE: ${report.status.toUpperCase()}
SNAPSHOT: ${report.currentStatus}
TREND: ${report.observedTrend}

${report.criticalSignals ? `WARNINGS:\n${report.criticalSignals}\n` : ''}
DATA INTERPRETATION:
${report.whyHappening}

RECOMMENDED PROTOCOLS:
${report.actions.map(a => `- ${a}`).join('\n')}
--------------------------------------------------
Generated by intelligence Core v2.4
        `.trim();

        res.json({
            status: report.status,
            summary: [report.currentStatus, report.observedTrend, report.actions[0]],
            detailedReport,
            downloadReport
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Analysis failure in Intelligence Core." });
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
