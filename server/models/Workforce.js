const mongoose = require("mongoose");

const workforceSchema = new mongoose.Schema({
    department: { type: String, required: true },
    totalWorkers: { type: Number, required: true },
    skillCategory: { type: String, required: true },
    employmentType: {
        type: String,
        enum: ['Permanent', 'Contract'],
        required: true
    },
    year: { type: Number, required: true },
    managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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

const Workforce = mongoose.models.Workforce || mongoose.model("Workforce", workforceSchema);
module.exports = Workforce;
