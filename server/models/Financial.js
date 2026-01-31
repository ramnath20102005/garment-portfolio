const mongoose = require("mongoose");

const financialSchema = new mongoose.Schema({
    revenueRange: { type: String, required: true },
    profitRange: { type: String, required: true },
    growthIndicator: { type: Number }, // percentage
    costCategories: [
        {
            name: { type: String },
            amount: { type: Number }
        }
    ],
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

const Financial = mongoose.models.Financial || mongoose.model("Financial", financialSchema);
module.exports = Financial;
