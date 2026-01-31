const mongoose = require("mongoose");

const exportSchema = new mongoose.Schema({
    region: { type: String, required: true },
    country: { type: String, required: true },
    category: { type: String, required: true },
    volume: { type: Number, required: true },
    value: { type: Number },
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

const Export = mongoose.models.Export || mongoose.model("Export", exportSchema);
module.exports = Export;
