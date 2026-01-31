const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    establishedYear: Number,
    location: String,
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

const Company = mongoose.models.Company || mongoose.model("Company", companySchema);
module.exports = Company;