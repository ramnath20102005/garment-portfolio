const mongoose = require("mongoose");

const OperationalReportSchema = new mongoose.Schema({
    reportingPeriod: {
        type: String, // e.g., "January 2026", "Q1 2026"
        required: true
    },
    teamSize: {
        type: Number,
        required: true
    },
    completedTasks: {
        type: Number,
        required: true
    },
    ongoingTasks: {
        type: Number,
        required: true
    },
    blockers: {
        type: String
    },
    remarks: {
        type: String
    },
    managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    submissionStatus: {
        type: String,
        enum: ['Draft', 'PendingApproval', 'Approved', 'Rejected'],
        default: 'Draft'
    },
    verificationMetadata: {
        verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        verifiedAt: { type: Date },
        rejectionReason: { type: String }
    }
}, { timestamps: true });

const OperationalReport = mongoose.models.OperationalReport || mongoose.model("OperationalReport", OperationalReportSchema);
module.exports = OperationalReport;
